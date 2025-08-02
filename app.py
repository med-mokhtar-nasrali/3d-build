from flask import Flask, send_from_directory, render_template
from pathlib import Path

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/plan')
def plan():
    return render_template('plan.html')

@app.route('/static/UnityBuild/<path:filename>')
def serve_unity_files(filename):
    response = send_from_directory('static/UnityBuild', filename)

    # Add proper headers for Brotli files
    if filename.endswith('.br'):
        original_name = filename[:-3]
        response.headers['Content-Encoding'] = 'br'

        if original_name.endswith('.js'):
            response.headers['Content-Type'] = 'application/javascript'
        elif original_name.endswith('.wasm'):
            response.headers['Content-Type'] = 'application/wasm'
        elif original_name.endswith('.data'):
            response.headers['Content-Type'] = 'application/octet-stream'

    return response

if __name__ == '__main__':
    app.run(debug=True)