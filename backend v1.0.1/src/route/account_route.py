from flask import request, jsonify, Blueprint, current_app
acc_route = Blueprint('acc_route', __name__)

@acc_route.route('/account', methods=['GET', 'POST', 'DELETE'])
def userpage():
    if request.method == 'POST':
        return current_app.config['AccOption'].add_user()
    if request.method == 'GET':
        return current_app.config['AccOption'].login()
    if request.method == 'DELETE':
        return current_app.config['AccOption'].delete_user()