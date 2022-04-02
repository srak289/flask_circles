#!/bin/bash
#export DATABASE_URL='postgres://localhost:5432/flask_todo'
export FLASK_APP='/root/flask_circles/circles/app.py'
export DEBUG=True
pipenv shell
