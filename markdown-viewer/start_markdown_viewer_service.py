# start_markdown_viewer_service.py

import sys
from markdown import markdown
from http.server import SimpleHTTPRequestHandler, HTTPServer

if len(sys.argv) != 2:
    print("Usage: python start_markdown_viewer_service.py README.md")
    sys.exit(1)

markdown_file = sys.argv[1]
html_file = markdown_file.replace('.md', '.html')

# Read the Markdown file and convert it to HTML
with open(markdown_file, 'r', encoding='utf-8') as f:
    markdown_content = f.read()
    html_content = markdown(markdown_content)

# Write the HTML content to a new file
with open(html_file, 'w',  encoding='utf-8') as f:
    f.write(html_content)

# Serve the HTML file
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == f"/{html_file}":
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            with open(html_file, 'r') as f:
                self.wfile.write(f.read().encode())
        else:
            self.send_error(404)

httpd = HTTPServer(('0.0.0.0', 8000), Handler)
print(f"Serving on http://localhost:8000/{html_file}")
httpd.serve_forever()
