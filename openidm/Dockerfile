FROM forgerock-repo-local/java-17

# Install required font package
RUN apt-get update && \
    apt-get install -y fonts-dejavu

# Copy the OpenIDM files
COPY --chown=forgerock:root ./bin /opt/openidm/bin
COPY --chown=forgerock:root ./bundle /opt/openidm/bundle
COPY --chown=forgerock:root ./lib /opt/openidm/lib
COPY --chown=forgerock:root ./connectors /opt/openidm/connectors
COPY --chown=forgerock:root ./resolver /opt/openidm/resolver
COPY --chown=forgerock:root ./conf /opt/openidm/conf
COPY --chown=forgerock:root ./security /opt/openidm/security
COPY --chown=forgerock:root ./db /opt/openidm/db
COPY --chown=forgerock:root ./script /opt/openidm/script
COPY --chown=forgerock:root ./ui /opt/openidm/ui
COPY --chown=forgerock:root ./samples /opt/openidm/samples
COPY --chown=forgerock:root ./legal-notices /opt/openidm/legal-notices
COPY --chown=forgerock:root ./*.sh /opt/openidm/

# Check the contents of the OpenIDM directory
RUN ls -l /opt/openidm

# Set working directory
WORKDIR /opt/openidm

# Ensure the entrypoint script is executable
RUN chmod +x /opt/openidm/bin/docker-entrypoint.sh

# Expose the necessary port
EXPOSE 8081

# Switch to the appropriate user
USER 11111

# Set the entrypoint
ENTRYPOINT ["/opt/openidm/bin/docker-entrypoint.sh", "openidm"]
