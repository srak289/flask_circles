from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASSSE_URI'] = os.environ.get('DATABASE_URL', '')
db = SQLAlchemy(app)
