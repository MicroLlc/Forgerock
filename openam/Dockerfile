# Use Tomcat as the base image
FROM forgerock-repo-local/tomcat:9.0.96

# Set environment variables
ENV OPENAM_HOME=/usr/local/tomcat/webapps/openam

# Copy the OpenAM WAR file into the container
COPY openam.war $OPENAM_HOME.war

# Expose the Tomcat port
EXPOSE 8080

# Set the working directory
WORKDIR /usr/local/tomcat/webapps

# Start Tomcat (this is the default CMD for the Tomcat image)
CMD ["catalina.sh", "run"]