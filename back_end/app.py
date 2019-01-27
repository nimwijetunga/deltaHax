from flask import Flask, request, jsonify
from line_detect import find_lines

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/api/coords", methods=['POST'])
def get_coords():
	files = request.files['pdf_doc']
	# print(files)
	resp = {}
	coords = find_lines(files.read())
	resp['coords'] = coords
	return jsonify(resp)

if __name__ == "__main__":
     # app.run(debug=True)
     app.run(host='0.0.0.0', port=8001, debug=True)