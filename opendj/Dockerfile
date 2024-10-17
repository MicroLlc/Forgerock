# Dockerfile
FROM forgerock-repo-local/java-17

ENV DJ_HOME=/opt/opendj
COPY ./DS-7.5.1 /opt/
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh && \
    chown -R root:root $DJ_HOME

WORKDIR $DJ_HOME

# Set environment variables
ENV LDAP_ADMIN_PASSWORD=secret
ENV ROOT_USER_PASSWORD=rootsecret
ENV DEPLOYMENT_ID_PASSWORD=password123-test
ENV HOSTNAME=localhost

# Expose LDAP and LDAPS ports
EXPOSE 1389 1636 4444 8080 8443 8989

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
