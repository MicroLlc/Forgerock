#!/bin/bash

# Name of the container
container_name="markdownviewer"

# Stop the container
echo "Stopping container '$container_name'..."
docker stop "$container_name"

# Check if the stop command succeeded
if [ $? -eq 0 ]; then
    echo "Successfully stopped container '$container_name'."
else
    echo "Failed to stop container '$container_name'."
    exit 1
fi

# Remove the container
echo "Removing container '$container_name'..."
docker rm "$container_name"

# Check if the remove command succeeded
if [ $? -eq 0 ]; then
    echo "Successfully removed container '$container_name'."
else
    echo "Failed to remove container '$container_name'."
    exit 1
fi
