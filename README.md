# ForgeRock Services Setup

This project provides the necessary scripts to set up and run ForgeRock services.

## Initial Setup

To start the ForgeRock services, you first need to run the initial setup script. This script will create all the required directories and prepare the environment.

## Running the Initial Setup Script
Only run int the first time you clone the repo. To start services again after initial setup, use the start_services.sh/shutdown_services.sh scripts
1. Open your terminal.
2. Run build_and_save_docker_images.sh script: this will unzip the directory
   - Build the openam, openidm, and openjdk images.
   - Save them into your local registry
    ```bash
   ./build_and_save_docker_images.sh
3. Starting the Services
   ```bash
   ./start_services.sh
   
## Starting the Services

This will initiate the Docker Compose process and start the OpenAM and OpenIDM containers.

### Accessing the Services

Once the services are up and running, you can access them using the following URLs:

- **OpenAM**: [http://localhost:8080/openam](http://localhost:8080/openam)
- **OpenIDM**: [http://localhost:8080/openidm](http://localhost:8080/openidm)

#### Port Information

- **OpenAM** runs on port `8080`
- **OpenIDM** runs on port `8080`

Make sure that these ports are not in use by any other applications before starting the services.

### Notes

- Ensure you have Docker and Docker Compose installed on your machine.
- Follow any additional setup instructions provided in the individual service directories.
