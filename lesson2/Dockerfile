# Use the official Keycloak Docker image
FROM jboss/keycloak:latest

# Environment variables to configure Keycloak
ENV KEYCLOAK_USER=admin
ENV KEYCLOAK_PASSWORD=admin
ENV DB_VENDOR=h2
ENV DB_ADDR=localhost
ENV DB_PORT=5432
ENV DB_DATABASE=keycloak
ENV DB_USER=keycloak
ENV DB_PASSWORD=keycloak

# Expose Keycloak's port (default is 8080)
EXPOSE 8080

# Add custom realm or configuration if needed
# COPY custom-realm.json /opt/jboss/keycloak/standalone/configuration/custom-realm.json

# Execute Keycloak's startup script
CMD ["-b", "0.0.0.0"]
