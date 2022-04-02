from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
	"""Print 'Hello, world' as response body."""
	return 'Hello, world!'

@app.route('/api/v1', methods=["GET"])
@app.route('/api/v1/', methods=["GET"])
def info_view():
    """List of routes for thie API."""
    output = {
		'info': 'GET /api/v1',
		'register': 'POST /api/v1/accounts',
		'single profile detail': 'GET /api/v1/accounts/<username>',
		'edit profile': 'PUT /api/v1/accounts/<username>',
		'delete profile': 'DELETE /api/v1/accounts/<username>',
		'login': 'POST /api/v1/accounts/login',
		'logout': 'GET /api/v1/accounts/logout',
		"user's tasks": 'GET /api/v1/accounts/<username>/tasks',
		"create task": 'POST /api/v1/accounts/<username>/tasks',
		"task detail": 'GET /api/v1/accounts/<username>/tasks/<id>',
		"task update": 'PUT /api/v1/accounts/<username>/tasks/<id>',
		"delete task": 'DELETE /api/v1/accounts/<username>/<id>'
	}
    return jsonify(output)	
