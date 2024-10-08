# Use the official Python image from Docker Hub
FROM python:3.11-alpine

# Install Pandoc and other necessary packages
RUN apk add --no-cache pandoc

# Set the working directory
WORKDIR /app

RUN ls -l /app
# Copy the script and the Markdown file into the container
COPY /README.md /app/README.md
COPY /start_markdown_viewer_service.py /app/start_markdown_viewer_service.py

# Install the markdown library
RUN pip install --no-cache-dir markdown

# Command to run the script
CMD ["python", "start_markdown_viewer_service.py", "README.md"]