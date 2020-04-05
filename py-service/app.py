from flask import Flask, flash, redirect, render_template, request, session, abort, send_from_directory, jsonify, Response
from flask_cors import CORS
import reverse_geocoder as rg
import utils
from bson import ObjectId

def create_app():
    app = Flask(__name__)
    CORS(app)
    db_conn = utils.get_mongo_connection()

    @app.route('/geo-service', strict_slashes=False,)
    def get_geo_details():
        lat = request.args.get('lat')
        long = request.args.get('long')
        if lat == None or long == None:
            return jsonify(error="Please provide lat & long information!", result="failed"), 400
        try:
            coordinates = (float(lat), float(long))
            results = rg.search(coordinates)
            return jsonify(data=results[0], result="sucess"), 200
        except:
            return jsonify(error="Error getting the location details", result="failed"), 500

    @app.route('/create-org', strict_slashes=False, methods=["POST"])
    def org_creation():
        try:
            org_name = request.form.get('org_name', "")
            org_email = request.form.get('org_email', "")
            org_country = request.form.get('org_country', "")
            org_state = request.form.get('org_state', "")
            org_city = request.form.get('org_city', "")
            org_needs = request.form.get('org_needs', "")
            ret_code = __validate_organisation(org_name, org_email, org_country, org_state, org_city, org_needs)
            if ret_code == 0:
                return jsonify(error="Mandatory fields : org_name, org_email, org_country, org_state, org_city, org_needs", result="failed"), 400
            org_record = {}
            db_collection = db_conn["organisation"]
            org_record['org_name'] = org_name
            org_record['org_email'] = org_email
            org_record['org_country'] = org_country
            org_record['org_state'] = org_state
            org_record['org_city'] = org_city
            org_record['org_needs'] = org_needs
            mongo_inst = db_collection.insert_one(org_record)
            org_id = str(mongo_inst.inserted_id)
            return jsonify(org_id=org_id, result="sucess"), 201
        except Exception as e:
            print(str(e))
            return jsonify(error="Error processing organisation information!", result="failed"), 500

    @app.route('/fetch-org', strict_slashes=False, )
    def org_fetch():
        try:
            org_name = request.args.get('org_name', "")
            org_id = request.args.get('org_id', "")
            if not org_name and not org_id:
                return jsonify(error="Mandatory fields : org_name or org_id", result="failed"), 400

            db_collection = db_conn["organisation"]
            if org_id:
                try:
                    mong_id = ObjectId(org_id)
                    org_record = db_collection.find({'_id':mong_id}, {'_id': False})[0]
                    return jsonify(org_record=org_record, result="sucess"), 200
                except Exception as e:
                    print(str(e))
                    return jsonify(error="org_id is not resolved!", result="failed"), 404
            else:
                try:
                    org_record = db_collection.find({'org_name': org_name}, {'_id': False})[0]
                    return jsonify(org_record=org_record, result="sucess"), 200
                except Exception as e:
                    print(str(e))
                    return jsonify(error="org_name is not resolved!", result="failed"), 404
        except:
            return jsonify(error="Error processing organisation information!", result="failed"), 500

    @app.route('/fetch-org-all', strict_slashes=False, )
    def org_fetch_all():
        try:
            db_collection = db_conn["organisation"]
            all_org_records = list(db_collection.find({}, {'_id': False}))
            return jsonify(org_records=all_org_records, result="success"), 200
        except:
            return jsonify(error="Error processing organisation information!", result="failed"), 500


    @app.route('/update-org', strict_slashes=False, methods=["POST"])
    def org_update():
        try:
            ui_org_record = {}
            org_name = request.form.get('org_name', "")
            org_id = request.form.get('org_id', "")
            if not org_name and not org_id:
                return jsonify(error="Mandatory fields : org_name or org_id", result="failed"), 400
            db_collection = db_conn["organisation"]
            db_org_record = {}
            if org_id:
                try:
                    mong_id = ObjectId(org_id)
                    db_org_record = db_collection.find({'_id':mong_id}, {'_id': False})[0]
                except:
                    return jsonify(error="org_id is not resolved!", result="failed"), 404
            else:
                try:
                    db_org_record = db_collection.find({'org_name': org_name}, {'_id': False})[0]
                except:
                    return jsonify(error="org_name is not resolved!", result="failed"), 404


            org_description = request.form.get('org_description', "")
            org_address = request.form.get('org_address', "")
            org_owner = request.form.get('org_owner', "")
            org_global = request.form.get('global', "")
            org_website = request.form.get('org_website', "")
            org_ios = request.form.get('org_language', "")
            org_google_play = request.form.get('googleplay', "")

            ui_org_record['org_description'] = org_description
            ui_org_record['org_address'] = org_address
            ui_org_record['org_owner'] = org_owner
            ui_org_record['global'] = org_global
            ui_org_record['org_website'] = org_website
            ui_org_record['org_language'] = org_ios
            ui_org_record['googleplay'] = org_google_play

            org_record = __prepare_org_record(db_org_record, ui_org_record)
            if org_id:
                mong_id = ObjectId(org_id)
                db_collection.update_one({"_id" : mong_id }, { "$set": org_record })
                return jsonify(org_id=org_id,msg="Organisation record updated sucessfully", result="sucess"), 201
            else:
                db_collection.update_one({"org_name" : org_name }, { "$set": org_record })
                return jsonify(org_name=org_name,msg="Organisation record updated sucessfully", result="sucess"), 201
            return jsonify(success="yes"), 200
        except Exception as e:
            print(str(e))
            return jsonify(error="Error processing organisation information!", result="failed"), 500

    def __prepare_org_record(db_org_record, ui_org_record):
        return db_org_record.update(ui_org_record)

    def __validate_organisation(*arguments):
        for param in arguments:
            if not param:
                return 0
        return 1
    return app

if __name__ == '__main__':
    app = create_app()
    #app.jinja_env.auto_reload = True
    #app.config['TEMPLATES_AUTO_RELOAD'] = True
    #app.config['PROPAGATE_EXCEPTIONS'] = True
    app.run(host="0.0.0.0", port=5000)
