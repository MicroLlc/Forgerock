#!/bin/bash

# Check if the Markdown file is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 README.md"
  exit 1
fi

MARKDOWN_FILE=$1
HTML_FILE="${MARKDOWN_FILE%.md}.html"

# Convert Markdown to HTML using pandoc with UTF-8 encoding
pandoc --from markdown -o "$HTML_FILE" "$MARKDOWN_FILE"

# Start a simple HTTP server
echo "Starting HTTP server to view $HTML_FILE..."
python3 -m http.server 8000 &

# Get the server's PID
SERVER_PID=$!

# Wait for user input to stop the server
read -p "Press [Enter] to stop the server..."

# Kill the HTTP server
kill "$SERVER_PID"

echo "Server stopped."
