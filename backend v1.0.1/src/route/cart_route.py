from flask import request, jsonify, Blueprint, current_app

cart_route = Blueprint('cart_route', __name__)

@cart_route.route('/cart', methods=['GET', 'POST', 'DELETE'])
def Cartpage():
    return current_app.config['cartOption'].get_Cart()

@cart_route.route('/cart/<product_id>', methods=['GET', 'POST', 'DELETE'])
def cart(product_id=None):
    if request.method == 'GET':
        return current_app.config['cartOption'].put_Cart(p_id=product_id)
    
    if request.method == 'DELETE':
        return current_app.config['cartOption'].delete_Cart(product_id = product_id)