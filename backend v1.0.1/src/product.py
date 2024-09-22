from db import db
from model import Product
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy

class Prod:
    def __init__(self, db: SQLAlchemy) -> None:
        self.db = db

    def get_Prod(self, prod_id = None):
        gp = Product.query
        if prod_id:
            gp = gp.filter(Product.id.__eq__(prod_id))
        product = gp.all()
        return jsonify([p.to_dict() for p in product])
