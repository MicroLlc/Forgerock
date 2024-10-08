#!/bin/bash

# Store the initial directory (root of the script)
initial_dir=$(pwd)

# Define an array with the directory paths (update with actual paths)
directories=(
    "$initial_dir/java-17"   # Adjust the paths to be absolute or relative to the initial directory
    "$initial_dir/openam"
    "$initial_dir/openidm"
    "$initial_dir/markdown-viewer"
)

# Define an array with image names corresponding to the directories
remote_registry=forgerock-repo-local
image_names=(
    "$remote_registry/java-17:latest"
    "$remote_registry/openam:7.5.0"
    "$remote_registry/openidm:7.5.0"
    "$remote_registry/markdown-viewer:0.0.1"
)

# Set the output directory
output_dir="$initial_dir"

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"

# Loop through each directory to build and save the Docker images
for i in "${!directories[@]}"; do
    dir="${directories[$i]}"
    image_name="${image_names[$i]}"

    echo "Building Docker image from $dir..."
    cd "$dir" || { echo "Directory $dir not found. Skipping..."; continue; }

    # Build the Docker image
    docker build -t "$image_name" .

    if [ $? -eq 0 ]; then
        echo "Successfully built $image_name."

        # Save the Docker image to a .tar file
        tar_file="${image_name//:/-}.tar"  # Replace ':' with '-' in the filename

        # Save the Docker image to the specified output directory
        docker save -o "$output_dir/$tar_file" "$image_name"

        if [ $? -eq 0 ]; then
            echo "Saved Docker image to $output_dir/$tar_file."
        else
            echo "Failed to save Docker image $image_name."
        fi
    else
        echo "Failed to build Docker image from $dir."
    fi

    # Return to the initial directory for the next iteration
    cd "$initial_dir" || { echo "Failed to return to initial directory. Exiting..."; exit 1; }
done

echo "All operations completed."
