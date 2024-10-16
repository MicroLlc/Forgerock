"use strict";

/*
 * Copyright 2015-2023 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

define(["jquery", "lodash", "org/forgerock/openidm/ui/admin/util/AdminAbstractView", "org/forgerock/commons/ui/common/main/EventManager", "org/forgerock/commons/ui/common/main/ValidatorsManager", "org/forgerock/commons/ui/common/util/Constants", "org/forgerock/openidm/ui/admin/delegates/ConnectorDelegate", "org/forgerock/openidm/ui/admin/connector/ConnectorTypeView", "org/forgerock/openidm/ui/admin/connector/ConnectorRegistry", "org/forgerock/commons/ui/common/main/Router"], function ($, _, AdminAbstractView, eventManager, validatorsManager, constants, ConnectorDelegate, ConnectorType, ConnectorRegistry, router) {

    var AbstractConnectorView = AdminAbstractView.extend({
        data: {},
        model: {},

        //Find the major version. If a range is used it will select the newest version of a connector template available
        //A bad main version will kill the connector edit process
        findMainVersion: function findMainVersion(version) {
            if (version.length > 0) {
                version = version.split(".");
                version = version[0] + "." + version[1];

                return version;
            } else {
                eventManager.sendEvent(constants.EVENT_DISPLAY_MESSAGE_REQUEST, "connectorBadMainVersion");
                return "0.0";
            }
        },

        //Finds the minor version.
        //A bad minor version will NOT kill the connector editing process since we primarily rely on major version for everything except for JAR selection
        findMinorVersion: function findMinorVersion(version) {
            if (version.length > 0) {
                version = version.split(".");
                version = version[2] + "." + version[3];

                return version;
            } else {
                eventManager.sendEvent(constants.EVENT_DISPLAY_MESSAGE_REQUEST, "connectorBadMinorVersion");
                return "0.0";
            }
        },

        loadConnectorTemplate: function loadConnectorTemplate(callback) {
            var connectorData,
                connectorTemplate,
                selectedValue = this.$el.find("#connectorType option:selected"),
                mainVersion,
                connectorRef;

            connectorData = _.find(this.data.connectors, function (connector) {
                return connector.connectorName === selectedValue.attr('connectorTypeName') && connector.bundleVersion === selectedValue.attr('bundleVersion');
            });

            // For each schedule on the page
            _.forEach(this.addedLiveSyncSchedules, _.bind(function (source) {
                this.$el.find("#" + source.split("/").join("")).find(".deleteSchedule").click();
                this.addedLiveSyncSchedules.splice(_.indexOf(this.addLiveSyncScheduler, source), 1);
            }, this));
            this.objectTypes = [];

            //If for some reason no connector data
            if (_.isUndefined(connectorData)) {
                eventManager.sendEvent(constants.EVENT_DISPLAY_MESSAGE_REQUEST, "connectorsNotAvailable");
                eventManager.sendEvent(constants.EVENT_CHANGE_VIEW, { route: router.configuration.routes.connectorView });
            } else {
                mainVersion = this.findMainVersion(connectorData.bundleVersion);

                //Checking to ensure we don't reload the page if a minor version is changed
                if (this.data.currentMainVersion === null || parseFloat(this.data.currentMainVersion) !== parseFloat(mainVersion) || this.data.connectorTypeName !== selectedValue.attr('connectorTypeName')) {
                    this.data.connectorTypeName = selectedValue.attr('connectorTypeName');
                    this.data.systemType = selectedValue.attr('systemType');
                    this.data.currentMainVersion = this.findMainVersion(connectorData.bundleVersion);

                    connectorTemplate = connectorData.connectorName + "_" + mainVersion;

                    connectorRef = {
                        connectorRef: connectorData
                    };

                    $.when(ConnectorRegistry.getConnectorModule(connectorTemplate), ConnectorDelegate.detailsConnector(connectorRef)).then(_.bind(function (connectorTypeRef, connectorDefaults) {
                        this.connectorTypeRef = connectorTypeRef;

                        if (this.connectorTypeRef.oAuthConnector) {
                            this.oAuthConnector = true;
                        } else {
                            this.oAuthConnector = false;
                        }

                        this.connectorTypeRef.render({
                            "connectorType": connectorTemplate,
                            "animate": true,
                            "connectorDefaults": connectorDefaults[0],
                            "editState": this.data.editState,
                            "systemType": this.data.systemType
                        }, _.bind(function () {
                            this.setSubmitFlow();

                            validatorsManager.validateAllFields(this.$el);
                            this.$el.find("#connectorName").focus();
                            if (_.isFunction(callback)) {
                                callback();
                            }
                        }, this));
                    }, this));
                } else {
                    //Set the bundle version on a minor version change so it saves
                    this.connectorTypeRef.data.connectorDefaults.connectorRef.bundleVersion = selectedValue.attr('bundleVersion');
                }
            }
        },

        showError: function showError(msg) {
            var error = JSON.parse(msg.responseText);

            eventManager.sendEvent(constants.EVENT_DISPLAY_MESSAGE_REQUEST, "connectorTestFailed");

            this.$el.find("#connectorErrorMessage .message").html(this.parseErrorMessage(error.message));
            this.$el.find("#connectorErrorMessage").show();
        },

        parseErrorMessage: function parseErrorMessage(err) {
            var transformErrors = [{
                searchString: 'UnknownHostException',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.unknownHost'
            }, {
                searchString: 'port out of range',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.portOutOfRange'
            }, {
                searchString: 'Connection refused',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.connectionRefused'
            }, {
                searchString: 'Operation timed out',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.operationTimedOut'
            }, {
                searchString: 'SSLHandshakeException',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.sslHandshakeException'
            }, {
                searchString: 'data 52e',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.invalidCredentials'
            }, {
                searchString: 'NamingException',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.invalidCredentials'
            }, {
                searchString: 'Bad Base Context(s)',
                replaceAll: false,
                replaceString: 'templates.connector.errorMessages.badBaseContext'
            }, {
                searchString: 'java.lang.String to int',
                replaceAll: true,
                replaceString: 'templates.connector.errorMessages.portOutOfRange'
            }];

            _.forEach(transformErrors, function (e) {
                if (err.indexOf(e.searchString) > -1) {
                    if (e.replaceAll) {
                        err = $.t(e.replaceString);
                    } else {
                        err = err.replace(e.searchString, $.t(e.replaceString));
                    }
                }
            });

            return err;
        },

        setSubmitFlow: function setSubmitFlow() {
            var connectorSpecificCheck = false;

            if (this.connectorTypeRef.connectorSpecificValidation) {
                connectorSpecificCheck = this.connectorTypeRef.connectorSpecificValidation();
            }

            this.$el.find("#submitConnector").unbind("click");

            if (this.oAuthConnector) {
                if (this.connectorTypeRef.data.connectorDefaults.configurationProperties.clientId !== this.$el.find("#clientId").val() || this.$el.find("#clientSecret").val().length > 0 || this.connectorTypeRef.data.connectorDefaults.configurationProperties.refreshToken === null || connectorSpecificCheck) {

                    this.$el.find("#submitConnector").bind("click", _.bind(this.oAuthFormSubmit, this));
                } else {
                    this.$el.find("#submitConnector").bind("click", _.bind(this.connectorFormSubmit, this));
                }
            } else {
                this.$el.find("#submitConnector").bind("click", _.bind(this.connectorFormSubmit, this));
            }
        },

        oAuthFormSubmit: function oAuthFormSubmit(event) {
            event.preventDefault();
            var mergedResult = this.getProvisioner(),
                connectorId = this.data.connectorId,
                grantType = mergedResult.configurationProperties.grantType;

            if (_.isUndefined(connectorId)) {
                connectorId = this.$el.find("#connectorName").val();
            }

            if (grantType !== undefined && grantType === 'client_credentials') {
                this.connectorFormSubmit(event);
            } else {
                this.connectorTypeRef.submitOAuth(mergedResult, this.data.editState, connectorId);
            }
        },

        getConnectorConfig: function getConnectorConfig() {
            return this.model.connectorDetails;
        },

        setConnectorConfig: function setConnectorConfig(config) {
            this.model.connectorDetails = config;
        },

        /*
         * traverse an object of unknown depth and replace all empty string values with null
         * and filter any arrays of falsy elements.
         */
        cleanseObject: function cleanseObject(obj) {
            var _this = this;

            return _.transform(_.cloneDeep(obj), function (result, orig, key) {
                if (_.isObject(orig)) {
                    if (_.isArray(orig)) {
                        result[key] = orig.filter(function (i) {
                            return !!i;
                        });
                    } else {
                        result[key] = _this.cleanseObject(orig);
                    }
                } else {
                    result[key] = orig;
                    if (orig === "") {
                        result[key] = null;
                    }
                }
            });
        },

        warningMessageCheck: function warningMessageCheck() {
            if ($("#connectorWarningMessage .message .pending-changes").length === 0) {
                $("#connectorWarningMessage").hide();
            }
        }
    });

    return AbstractConnectorView;
});
