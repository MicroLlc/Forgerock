#!/bin/bash

# Directory to zip
directory="../Forgerock-Custom-Build"

# Check if the directory is provided
if [ -z "$directory" ]; then
    echo "Usage: $0 /path/to/directory"
    exit 1
fi

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Directory '$directory' does not exist."
    exit 1
fi

# Get the base name of the directory to create the zip file name
zip_file_name="${directory%/}-v1.zip"

# Zip the directory excluding the two scripts and the .idea directory
echo "Zipping the contents of '$directory' into '$zip_file_name', excluding initial_setup scripts and .idea directory..."
zip -r "$zip_file_name" "$directory" --exclude "initial_setup.sh" --exclude "/.idea/*"

# Check if the zip command succeeded
if [ $? -eq 0 ]; then
    echo "Successfully created zip file '$zip_file_name'."
else
    echo "Failed to create zip file."
fi
