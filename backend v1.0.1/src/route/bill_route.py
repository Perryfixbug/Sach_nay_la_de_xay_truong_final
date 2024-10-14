from flask import request, jsonify, Blueprint, current_app

bill_route = Blueprint('bill_route', __name__)

@bill_route.route('/bill', defaults={'id': None}, methods=['GET', 'POST', 'DELETE'])
@bill_route.route('/bill/<int:id>', methods=['DELETE'])
def billpage(id):
    if request.method == 'GET':
        return current_app.config['billOption'].get_bill(id = id)
    if request.method == 'POST':
        return current_app.config['billOption'].add_bill()
