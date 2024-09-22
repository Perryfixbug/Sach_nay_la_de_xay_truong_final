from flask import send_from_directory, jsonify, Blueprint
from model import User, Product

image_r = Blueprint('image_route', __name__)

@image_r.route('/product_image/<id>')
def image_pd(id = None):
    prd = Product.query.get(id) 
    if prd:
        return send_from_directory('static/image/product', prd.img)

@image_r.route('/user_image/<id>')
def image_us(id = None):
    us = User.query.get(id) 
    if us:
        return send_from_directory('static/image/user_avt', us.img)