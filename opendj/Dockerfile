FROM forgerock-repo-local/java-17

ENV DJ_HOME=/opt/opendj
COPY ./DS-7.5.1 /opt/

RUN chown -R root:root $DJ_HOME

WORKDIR $DJ_HOME
#CMD ["./bin/start-ds"]


# Set environment variables
ENV LDAP_ADMIN_PASSWORD=secret
ENV ROOT_USER_PASSWORD=rootsecret
#ENV DEPLOYMENT_ID=WILL-BE-SET
ENV DEPLOYMENT_ID_PASSWORD=password123-test
ENV HOSTNAME=localhost

# Expose LDAP and LDAPS ports
EXPOSE 1389 1636 4444 8080 8443 8989

# Run the command and check for errors
RUN /opt/opendj/bin/dskeymgr create-deployment-id --outputfile deployement_id.txt --deploymentIdPassword "$DEPLOYMENT_ID_PASSWORD" && \
    echo "Deployment ID stored in deployement_id.txt" && \
    cat deployement_id.txt

# Read the deployment ID and set it as an environment variable
RUN DEPLOYMENT_ID=$(cat deployement_id.txt) && \
    echo "Setting DEPLOYMENT_ID environment variable" && \
    echo "DEPLOYMENT_ID=${DEPLOYMENT_ID}" >> /etc/environment

# Run the OpenDJ setup when the container starts
CMD ["/bin/bash", "-c", " \
    source /etc/environment && \
    echo \"Deploying with:\n  Deployment ID: $DEPLOYMENT_ID\n  Hostname: $HOSTNAME\n  Admin Password: $ROOT_USER_PASSWORD\" && \
    /opt/opendj/setup \
    --adminConnectorPort 4444 \
    --ldapsPort 636 \
    --enableStartTLS \
    --deploymentId \"$DEPLOYMENT_ID\" \
    --hostname \"$HOSTNAME\" \
    --rootUserPassword \"$ROOT_USER_PASSWORD\" \
    --deploymentIdPassword \"$DEPLOYMENT_ID_PASSWORD\" \
    --acceptLicense && \
    /opt/opendj/bin/start-ds"]

