#!/bin/bash

# Set the directory where the Docker tar files are stored


# Set the directory where the Docker tar files are stored
input_dir="./forgerock-repo-local"
registry_url="localhost:5000"     # Change this to your external registry URL

# Check if the input directory exists
if [ ! -d "$input_dir" ]; then
    echo "Directory $input_dir does not exist. Exiting..."
    exit 1
fi

# Loop through all .tar files in the input directory
for tar_file in "$input_dir"/*.tar; do
    # Check if there are any .tar files
    if [ ! -e "$tar_file" ]; then
        echo "No .tar files found in $inp ut_dir. Exiting..."
        exit 1
    fi

    echo "Loading Docker image from $tar_file..."

    # Load the Docker image
    docker load -i "$tar_file"

    if [ $? -ne 0 ]; then
        echo "Failed to load Docker image from $tar_file."
        continue
    fi

    # Extract image name (without the .tar extension)
    image_name=$(basename "$tar_file" .tar)

    # Tag the image for the internal registry
    docker tag "$image_name" "$registry_url/$image_name"

    # Push the image to the internal registry
    echo "Pushing $image_name to $registry_url..."
    docker push "$registry_url/$image_name"

    if [ $? -eq 0 ]; then
        echo "Successfully pushed $image_name to $registry_url
        l."
    else
        echo "Failed to push $image_name to $registry_url."
    fi
done

echo "All operations completed."
