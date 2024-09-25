from flask import Flask, jsonify, url_for,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from cart_option import CartOption
from user_option import User_option 
from product_option import Prod

from db import db
from route.home import home
from route.product_route import product_route
from route.cart_route import cart_route
from route.account_route import acc_route
from route.image_route import image_r
from os import path

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///sce_web.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    app.config['Prod'] = Prod(db = db)
    app.config['cartOption'] = CartOption(db=db)
    app.config['AccOption'] = User_option(db=db)
    app.register_blueprint(product_route)
    app.register_blueprint(cart_route)
    app.register_blueprint(home)
    app.register_blueprint(acc_route)
    app.register_blueprint(image_r)

    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    CORS(app)

    app.run(debug= True, port= 5000)