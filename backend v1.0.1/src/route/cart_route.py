from flask import request, jsonify, Blueprint, current_app

cart_route = Blueprint('cart_route', __name__)

@cart_route.route('/cart', methods=['GET', 'POST', 'DELETE'])
def Cartpage():
    if request.method == 'GET':
        return current_app.config['cartOption'].get_Cart()
    if request.method == 'POST':
        return current_app.config['cartOption'].add_Cart()
    
    if request.method == 'DELETE':
        return current_app.config['cartOption'].delete_Cart()
