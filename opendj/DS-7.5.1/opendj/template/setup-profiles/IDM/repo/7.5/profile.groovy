/*
 * Copyright 2018-2024 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

def addJsonEqualityMatchingRule(String providerName, String name, String oid, Collection<String> indexedFields) {
    def arguments = [ "create-schema-provider",
                      "--type", "json-query-equality-matching-rule",
                      "--set", "enabled:true",
                      "--set", "case-sensitive-strings:false",
                      "--set", "ignore-white-space:true",
                      "--provider-name", providerName,
                      "--set", "matching-rule-name:" + name,
                      "--set", "matching-rule-oid:" + oid ]
    for (String indexedField in indexedFields) {
        arguments.add("--set")
        arguments.add("indexed-field:" + indexedField)
    }
    ds.config arguments
}

addJsonEqualityMatchingRule "IDM managed/user Json Schema",
                            "caseIgnoreJsonQueryMatchManagedUser",
                            "1.3.6.1.4.1.36733.2.3.4.1",
                            [ "userName", "givenName", "sn", "mail", "accountStatus"]

addJsonEqualityMatchingRule "IDM managed/role Json Schema",
                            "caseIgnoreJsonQueryMatchManagedRole",
                            "1.3.6.1.4.1.36733.2.3.4.2",
                            [ "condition/**", "temporalConstraints/**" ]

addJsonEqualityMatchingRule "IDM Relationship Json Schema",
                            "caseIgnoreJsonQueryMatchRelationship",
                            "1.3.6.1.4.1.36733.2.3.4.3",
                            [ "firstResourceCollection", "firstResourceId", "firstPropertyName",
                              "secondResourceCollection", "secondResourceId", "secondPropertyName" ]

addJsonEqualityMatchingRule "IDM Cluster Object Json Schema",
                            "caseIgnoreJsonQueryMatchClusterObject",
                            "1.3.6.1.4.1.36733.2.3.4.4",
                            [ "timestamp", "state"]

ds.addBackendWithDefaultUserIndexes backendName, "dc=openidm," + domain

ds.addSchemaFiles()

ds.addIndex "fr-idm-uuid", "equality"
ds.addIndex "fr-idm-managed-user-json", "equality"
ds.addIndex "fr-idm-managed-role-json", "equality"
ds.addIndex "fr-idm-relationship-json", "big-equality"
ds.addIndex "fr-idm-cluster-json", "equality"
ds.addIndex "fr-idm-json", "equality"
ds.addIndex "fr-idm-link-type", "equality"
ds.addIndex "fr-idm-link-firstid", "equality"
ds.addIndex "fr-idm-link-secondid", "equality"
ds.addIndex "fr-idm-link-qualifier", "equality"
ds.addIndex "fr-idm-link-firstid-constraint", "equality"
ds.addIndex "fr-idm-link-secondid-constraint", "equality"
ds.addIndex "fr-idm-lock-nodeid", "equality"
ds.addIndex "fr-idm-syncqueue-mapping", "equality"
ds.addIndex "fr-idm-syncqueue-resourceid", "equality"
ds.addIndex "fr-idm-syncqueue-state", "equality"
ds.addIndex "fr-idm-syncqueue-createdate", "equality"
ds.addIndex "fr-idm-custom-attrs", "equality"
ds.addIndex "fr-idm-managed-user-custom-attrs", "equality"
ds.addIndex "fr-idm-managed-organization-json", "equality"
ds.addIndex "fr-idm-managed-user-active-date", "ordering"
ds.addIndex "fr-idm-managed-user-inactive-date", "ordering"
ds.addIndex "fr-idm-managed-group-json", "equality"
ds.addIndex "fr-idm-managed-assignment-json", "equality"
ds.addIndex "fr-idm-managed-organization-name", "equality"
ds.addIndex "fr-idm-managed-application-json", "equality"
ds.addIndex "fr-idm-reconassocentry-situation", "big-equality"
ds.addIndex "pwdChangedTime", "ordering"

for (def attributeName : List.of(
        "fr-idm-managed-user-meta",
        "fr-idm-managed-user-notifications",)) {
    ds.config "create-backend-index",
            "--index-name", attributeName,
            "--backend-name", backendName,
            "--set", "index-type:extensible",
            "--set", "index-extensible-matching-rule:1.3.6.1.4.1.36733.2.1.4.7",
            "--set", "index-extensible-matching-rule:1.3.6.1.4.1.36733.2.1.4.8"
}

for (def attributeName : List.of(
        "fr-idm-managed-user-roles",
        "fr-idm-managed-user-manager",
        "fr-idm-managed-role-assignments",
        "fr-idm-managed-role-applications",
        "fr-idm-managed-user-task-principals",
        "fr-idm-internal-user-authzroles-managed-role",
        "fr-idm-internal-user-authzroles-internal-role",
        "fr-idm-internal-role-authzmembers-managed-user",
        "fr-idm-internal-role-authzmembers-internal-user",
        "fr-idm-managed-user-authzroles-internal-role",
        "fr-idm-managed-user-authzroles-managed-role",
        "fr-idm-managed-organization-parent",
        "fr-idm-managed-organization-owner",
        "fr-idm-managed-organization-admin",
        "fr-idm-managed-organization-member",
        "fr-idm-managed-user-groups",
        "fr-idm-managed-assignment-member",
        "fr-idm-managed-application-member",
        "fr-idm-managed-application-owner",
        "fr-idm-reference-1",
        "fr-idm-reference-2",
        "fr-idm-reference-3",
        "fr-idm-reference-4",
        "fr-idm-reference-5",)) {
    ds.config "create-backend-index",
            "--index-name", attributeName,
            "--backend-name", backendName,
            "--set", "index-type:big-extensible",
            "--set", "big-index-extensible-matching-rule:1.3.6.1.4.1.36733.2.1.4.7",
            "--set", "big-index-extensible-matching-rule:1.3.6.1.4.1.36733.2.1.4.8"
}

ds.config "create-plugin",
        "--plugin-name", "FirstId Links Unique Attribute",
        "--type", "unique-attribute",
        "--set", "type:fr-idm-link-firstid-constraint",
        "--set", "base-dn:ou=links,dc=openidm," + domain,
        "--set", "enabled:true"

ds.config "create-plugin",
        "--plugin-name", "SecondId Links Unique Attribute",
        "--type", "unique-attribute",
        "--set", "type:fr-idm-link-secondid-constraint",
        "--set", "base-dn:ou=links,dc=openidm," + domain,
        "--set", "enabled:true"

ds.config "create-plugin",
        "--plugin-name", "fr-idm-referential-int-plugin",
        "--type", "referential-integrity",
        "--set", "base-dn:dc=openidm," + domain,
        "--set", "attribute-type:fr-idm-managed-user-roles",
        "--set", "attribute-type:fr-idm-managed-user-groups",
        "--set", "attribute-type:fr-idm-managed-user-manager",
        "--set", "attribute-type:fr-idm-managed-role-assignments",
        "--set", "attribute-type:fr-idm-managed-role-applications",
        "--set", "attribute-type:fr-idm-managed-user-task-principals",
        "--set", "attribute-type:fr-idm-managed-user-meta",
        "--set", "attribute-type:fr-idm-managed-user-notifications",
        "--set", "attribute-type:fr-idm-internal-user-authzroles-managed-role",
        "--set", "attribute-type:fr-idm-internal-user-authzroles-internal-role",
        "--set", "attribute-type:fr-idm-internal-role-authzmembers-managed-user",
        "--set", "attribute-type:fr-idm-internal-role-authzmembers-internal-user",
        "--set", "attribute-type:fr-idm-managed-user-authzroles-internal-role",
        "--set", "attribute-type:fr-idm-managed-user-authzroles-managed-role",
        "--set", "attribute-type:fr-idm-managed-organization-admin",
        "--set", "attribute-type:fr-idm-managed-organization-owner",
        "--set", "attribute-type:fr-idm-managed-organization-member",
        "--set", "attribute-type:fr-idm-managed-organization-parent",
        "--set", "attribute-type:fr-idm-managed-assignment-member",
        "--set", "attribute-type:fr-idm-managed-application-member",
        "--set", "attribute-type:fr-idm-managed-application-owner",
        "--set", "attribute-type:fr-idm-reference-1",
        "--set", "attribute-type:fr-idm-reference-2",
        "--set", "attribute-type:fr-idm-reference-3",
        "--set", "attribute-type:fr-idm-reference-4",
        "--set", "attribute-type:fr-idm-reference-5",
        "--set", "enabled:true"

ds.importLdifTemplate "base-entries.ldif"
