"use strict";

/*
 * Copyright 2015-2024 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

define(["jquery", "underscore", "handlebars", "org/forgerock/commons/ui/common/main/AbstractView", "org/forgerock/commons/ui/common/main/Configuration", "org/forgerock/commons/ui/common/util/UIUtils"], function ($, _, Handlebars, AbstractView, conf, uiUtils) {
    var FilterEditor = AbstractView.extend({
        template: "templates/util/SetupFilter.html",
        data: {
            config: {
                ops: ["and", "or", "not", "expr"],
                tags: ["equalityMatch", "greaterOrEqual", "lessOrEqual"]
            },
            showSubmitButton: true
        },
        events: {
            "change .expressionTree :input": "updateNodeValue",
            "click .expressionTree .add-btn": "addNodeAndReRender",
            "click .expressionTree .remove-btn": "removeNode"
        },
        getExpressionContext: function getExpressionContext(e) {
            e.preventDefault();
            var objectPath = _.map($(e.target).parentsUntil(".expressionTree fieldset>div", ".node[index]"), function (li) {
                return $(li).attr("index");
            }).reverse(),
                previousNode = null,
                node = this.data.filter;
            _.forEach(objectPath, function (index) {
                if (index.length) {
                    previousNode = node;
                    node = node.children[index];
                }
            });

            return { current: node, parent: previousNode, path: objectPath };
        },

        createNode: function createNode(options) {
            var node = { name: "", value: "", tag: "equalityMatch", children: [], op: "expr" };
            return _.merge(node, options);
        },

        deleteNode: function deleteNode(tree, contextPath) {
            var path = _.chain(contextPath).takeRight(contextPath.length - 1).map(function (val) {
                return Number(val);
            }).value(),
                level = -1;

            if (path.length >= 1 && JSON.stringify(contextPath) !== JSON.stringify(['', '0'])) {
                // if parent and should remove the calling node from parent children collection
                var parent = this.getNode(tree, path, level),
                    grandParent = this.getNode(tree, path, level - 1);

                if (parent.children.length > 0) {
                    parent.children = parent.children.filter(function (child, index) {
                        return index !== _.last(path);
                    });
                }

                if (parent.children.length === 0) {
                    // check for orphaned branches
                    tree = this.pruneStrandedNodes(tree, path, parent, grandParent, level);
                }
            } else {
                // if no parent then modify root node (no filter base case)
                tree = { "op": "none", "children": [] };
            }
            return tree;
        },

        getNode: function getNode(tree, path, level) {
            if (_.some(path, function (p) {
                return typeof p !== "number";
            })) {
                throw "expected array of numbers but got " + path;
            }
            level = level || 0;
            return _.take(path, path.length + level).reduce(function (branch, p) {
                return branch.children[Number(p)];
            }, tree);
        },

        insertChildNode: function insertChildNode(parentNode, options) {
            var node = this.createNode(options);

            if (!parentNode.children) {
                parentNode.children = [];
            }
            parentNode.children.push(node);
            return parentNode;
        },

        pruneStrandedNodes: function pruneStrandedNodes(tree, path, parent, grandParent, level) {
            var indexToRemove = grandParent.children.indexOf(parent);

            if (parent === undefined || parent.children.length === 0) {
                grandParent.children.splice(indexToRemove, 1);

                if (grandParent.children.length === 0) {
                    // recursively traverse up tree until all orphaned nodes are removed
                    var newParent = this.getNode(tree, path, level),
                        newGrandParent = this.getNode(tree, path, level - 1);

                    level--;
                    this.pruneStrandedNodes(tree, path, newParent, newGrandParent, level);
                }
            }

            return tree;
        },

        removeNode: function removeNode(e, callback) {
            var context = this.getExpressionContext(e);

            this.data.filter = this.deleteNode(this.data.filter, context.path);
            this.setFilterString();
            this.renderExpressionTree(callback);
        },

        addNodeAndReRender: function addNodeAndReRender(e, callback) {
            var context = this.getExpressionContext(e),
                node = context.current;

            this.insertChildNode(node);
            this.setFilterString();
            this.renderExpressionTree(callback);
        },

        updateNodeValue: function updateNodeValue(e, callback) {
            var context = this.getExpressionContext(e),
                node = context.current,
                field = $(e.target),
                insertChildNode = this.insertChildNode.bind(this, node),
                redrawContainer = false;

            // handle field types
            if (field.hasClass("op")) {
                redrawContainer = true;
                node.op = field.val();

                if (node.op === "none") {
                    this.data.filter = { "op": "none", "children": [] };
                } else if (node.op === "expr") {
                    node.name = "";
                    node.value = "";
                    node.tag = "equalityMatch";
                    node.children = [];
                } else if (node.op === "not") {
                    if (!node.children || !node.children.length) {
                        insertChildNode();
                    } else {
                        node.children = [];
                        insertChildNode();
                    }
                } else if (node.op === "and" || node.op === "or") {
                    if (node.children) {
                        if (node.children.length < 2) {
                            // add as many as it takes to get to 2 nodes
                            _.times(2 - node.children.length, insertChildNode);
                        }
                    } else {
                        _.times(2, insertChildNode);
                    }
                }
                // end of op handlers
            } else if (field.hasClass("name")) {
                if (field.parent().siblings(".tag-body").find(".tag").val() === "extensibleMatchAND") {
                    node.extensible.matchType = field.val();
                    node.name = field.val() + ":1.2.840.113556.1.4.803";
                } else if (field.parent().siblings(".tag-body").find(".tag").val() === "extensibleMatchOR") {
                    node.extensible.matchType = field.val();
                    node.name = field.val() + ":1.2.840.113556.1.4.804";
                } else if (node) {
                    node.name = field.val();
                }
                // end of name handlers
            } else if (field.hasClass("tag")) {

                switch (field.val()) {
                    case "extensibleMatchAND":
                        node.tag = "extensibleMatch";
                        node.extensible = {
                            matchType: field.parent().siblings(".name-body").find(".name").val(),
                            rule: "1.2.840.113556.1.4.803",
                            value: field.parent().siblings(".value-body").find(".value").val(),
                            type: 169 // comes from ldapjs protocol definition for FILTER_EXT
                        };
                        node.name = field.parent().siblings(".name-body").find(".name").val() + ":1.2.840.113556.1.4.803";
                        break;

                    case "extensibleMatchOR":
                        node.tag = "extensibleMatch";
                        node.extensible = {
                            matchType: field.parent().siblings(".name-body").find(".name").val(),
                            rule: "1.2.840.113556.1.4.804",
                            value: field.parent().siblings(".value-body").find(".value").val(),
                            type: 169 // comes from ldapjs protocol definition for FILTER_EXT
                        };
                        node.name = field.parent().siblings(".name-body").find(".name").val() + ":1.2.840.113556.1.4.804";
                        break;

                    case "pr":
                        delete node.extensible;
                        field.parent().siblings(".value-body").css("display", "none");
                        node.name = field.parent().siblings(".name-body").find(".name").val();
                        node.tag = field.val();
                        break;

                    default:
                        delete node.extensible;
                        field.parent().siblings(".value-body").css("display", "");
                        node.name = field.parent().siblings(".name-body").find(".name").val();
                        node.tag = field.val();
                }
                // end of tag handlers
            } else if (field.hasClass("value")) {
                if (field.parent().siblings(".tag-body").find(".tag").val().match(/^extensibleMatch/)) {
                    node.extensible.value = field.val();
                }

                node.value = field.val();
            }
            // end of field type control flow.

            if (node && node.op !== "none") {
                this.setFilterString();
            } else {
                this.setFilterString("");
            }

            if (redrawContainer) {
                this.renderExpressionTree(callback);
            } else {
                this.$el.find(".filter").text(this.getFilterString());
            }
        },

        renderExpressionTree: function renderExpressionTree(callback) {
            if (callback) {
                uiUtils.renderTemplate(this.template, this.$el, _.assignIn({}, conf.globalData, this.data), callback, "replace");
            } else {
                uiUtils.renderTemplate(this.template, this.$el, _.assignIn({}, conf.globalData, this.data), $.noop(), "replace");
            }
        },

        setFilterString: function setFilterString(string) {
            if (string) {
                this.data.filterString = string;
            } else {
                this.data.filterString = this.getFilterString();
            }
        }
    }),
        filterDisplayClosure;

    Handlebars.registerHelper("filterDisplay", function (rules, config, options) {
        var returnVal = '',
            ops = _.clone(config.ops),
            tags = _.clone(config.tags);

        if (options.fn !== undefined) {
            ops.unshift("none");
            filterDisplayClosure = options.fn;
        }

        if (rules.children && rules.children.length) {
            rules.children = _.map(rules.children, function (c, index) {
                return _.assignIn(c, { index: index, lastChild: false, hasMultiple: rules.children.length > 1 });
            });
            rules.children[rules.children.length - 1].lastChild = true;
        }

        returnVal += filterDisplayClosure(_.assignIn(rules, {
            "options": _.map(ops, function (o) {
                return {
                    "value": o,
                    "label": $.t("templates.util.filter.options." + o),
                    "selected": rules.op === o
                };
            }),
            "tags": _.map(tags, function (o) {
                if (o === "extensibleMatchAND") {

                    return {
                        "value": o,
                        "label": $.t("templates.util.filter.tags.extensible.rules.bitAnd"),
                        "selected": rules.extensible && rules.extensible.rule === "1.2.840.113556.1.4.803"
                    };
                } else if (o === "extensibleMatchOR") {

                    return {
                        "value": o,
                        "label": $.t("templates.util.filter.tags.extensible.rules.bitOr"),
                        "selected": rules.extensible && rules.extensible.rule === "1.2.840.113556.1.4.804"
                    };
                } else {

                    return {
                        "value": o,
                        "label": $.t("templates.util.filter.tags." + o),
                        "selected": rules.tag === o
                    };
                }
            }),
            "delimiter": $.t($.t("templates.util.filter.delimiters." + rules.op)), // will only be valid for and and or
            "isExpr": rules.op === "expr",
            "unary": rules.tag === "pr", // there might be other unary tags later
            "isMultiValueType": rules.op === "and" || rules.op === "or",
            "config": config
        }));

        return returnVal;
    });

    return FilterEditor;
});
