#!/bin/bash

# Get the directory of the current script
script_dir="$(dirname "$(realpath "$0")")"

# Specify the zip file (you can change this if needed)
zip_file="$script_dir/forgerock_7_5_0.zip"  # Change 'my_archive.zip' to your zip file name

# Check if the zip file exists
if [ ! -f "$zip_file" ]; then
    echo "Zip file '$zip_file' does not exist."
    exit 1
fi

# Create a directory for the unzipped contents
output_dir="${zip_file%.zip}"  # Name the output directory after the zip file

# Unzip the file
echo "Unzipping '$zip_file' to '$output_dir'..."
mkdir -p "$output_dir"  # Create output directory if it doesn't exist
unzip -o "$zip_file" -d "$output_dir"  # Unzip into the output directory

# Check if the unzip command succeeded
if [ $? -eq 0 ]; then
    echo "Successfully unzipped '$zip_file' to '$output_dir'."
else
    echo "Failed to unzip '$zip_file'."
fi
