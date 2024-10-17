#!/bin/bash

# Define the services you have in your docker-compose.yml
services=("openam" "openidm" "opends")

# Prompt the user to select services to start
echo "Available services:"
for i in "${!services[@]}"; do
    echo "$((i + 1)). ${services[i]}"
done

# Prompt user for first service
read -p "Select the first service to start (1-${#services[@]}): " first_service
first_service_index=$((first_service - 1))

# Prompt user for second service
read -p "Select the second service to start (1-${#services[@]}): " second_service
second_service_index=$((second_service - 1))

# Prompt user for third service
read -p "Select the third service to start (1-${#services[@]}): " third_service
third_service_index=$((third_service - 1))

# Validate selections
if [[ $first_service_index -lt 0 || $first_service_index -ge ${#services[@]} ||
      $second_service_index -lt 0 || $second_service_index -ge ${#services[@]} ||
      $third_service_index -lt 0 || $third_service_index -ge ${#services[@]} ||
      $first_service_index -eq $second_service_index ||
      $first_service_index -eq $third_service_index ||
      $second_service_index -eq $third_service_index ]]; then
    echo "Invalid selection. Please select different services."
    exit 1
fi

# Start the selected services
echo "Starting ${services[first_service_index]}, ${services[second_service_index]}, and ${services[third_service_index]}..."
docker-compose up -d "${services[first_service_index]}" "${services[second_service_index]}" "${services[third_service_index]}"

# Check if the command succeeded
if [ $? -eq 0 ]; then
    echo "Successfully started ${services[first_service_index]}, ${services[second_service_index]}, and ${services[third_service_index]}."
else
    echo "Failed to start the selected services."
fi
