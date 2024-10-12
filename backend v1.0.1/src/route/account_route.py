from flask import request, jsonify, Blueprint, current_app
acc_route = Blueprint('acc_route', __name__)

@acc_route.route('/account/register', methods=['POST'])
def signup():
        return current_app.config['AccOption'].add_user()
@acc_route.route('/account', methods=['POST','DELETE'])
def login():
    if request.method == 'POST':
        return current_app.config['AccOption'].login()
    if request.method == 'DELETE':
        return current_app.config['AccOption'].delete_user()
@acc_route.route('/account/information')
def in4_user():
     pass