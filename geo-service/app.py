from flask import Flask, flash, redirect, render_template, request, session, abort, send_from_directory, jsonify, Response
import reverse_geocoder as rg

app = Flask(__name__)

@app.route('/geo-service')
def hello():
    lat = request.args.get('lat')
    long = request.args.get('long')
    if lat==None or long==None:
        return jsonify(error="Please provide lat & long information!", result="failed"), 400
    try:
        coordinates = (float(lat),float(long))
        results = rg.search(coordinates)
        return jsonify(data=results[0], result="sucess"), 200
    except:
        return jsonify(error="Error getting the location details", result="failed"), 500

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.run(host="0.0.0.0", port=5000)
