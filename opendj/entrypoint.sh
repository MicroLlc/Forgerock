#!/bin/bash
set -e

# Start OpenDJ in the background
/opt/opendj/bin/start-ds &

# Give OpenDJ some time to start
sleep 10

# Check if OpenDJ is running
if ! pgrep -f "start-ds" > /dev/null; then
    echo "Cannot to start OpenDJ."
    # Inform the user and keep the container alive
    echo "OpenDJ is running and waiting for you to exec into the container to run the setup command."
    echo "Use the following command to access the container:"
    echo "docker exec -it <container_name> /bin/bash"
    # Give OpenDJ some time to setup
    sleep 100000
    exit 1
fi



# Wait indefinitely to keep the container alive
while true; do
    sleep 60  # Sleep for a minute
done
