from flask import request, jsonify, Blueprint
from model import User, Product

image_r = Blueprint('image_route', __name__)

@image_r.route('/product_image/<id>')
def image_pd(id = None):
    prd = Product.query.get(id) 
    if prd:
        return jsonify(f"/image/{prd.img}")
    return jsonify("Image not found", 404)

@image_r.route('/user_image/<id>')
def image_us(id = None):
    us = User.query.get(id) 
    if us:
        return jsonify(f"/image/{us.img}")
    return jsonify("Image not found", 404)