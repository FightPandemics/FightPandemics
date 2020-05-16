# Geo Service

A simple flask-based service which translate latitude and longitude into location details.

## Running Locally With Docker

You can use the Dockerfile.dev to build an image yourself, or make use of the docker-compose.yml file in the repository root to run this service with all others.

## Running Locally Without Docker

Use Python 3.7, install requirements (you might want to use a virtualenv) using `pip install -r requirements.txt`.

Run the app with `python app.py`. You should see okay when you navigate to [localhost:5000/healthz](http://localhost:5000/healthz)

## Notes

To make the handling of the requirements.txt more convenient, and easier to upgrade in the future, [pip-tools](https://github.com/jazzband/pip-tools) should be used.

You can update dependencies using `pip-compile`, or add new ones by adding lines to the requirements.in file.

## TODOs

A few non-essential things which are missing:

[ ] Tests would be cool
[ ] Linting is love
[ ] Maybe consider using sentry to handle exceptions in production
