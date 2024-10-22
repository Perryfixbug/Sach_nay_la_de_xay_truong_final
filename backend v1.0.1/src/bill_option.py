from flask import jsonify, request,session
from model import Bill, Product
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import re

class Bill_Option:
    def __init__(self, db: SQLAlchemy):
        self.db = db
        self.status = 4
        self.user = 0
    def get_user(self):
        if not session.get('uid'):
            self.user = 0
        else: self.user = str(session['uid'])
        print(self.user)
    def get_bill(self):
        try:
            orlist = Bill.query.all()
            if not len(orlist):
                return jsonify('Không tìm thấy đơn hàng nào theo yêu cầu'), 404
            return jsonify([o.to_dict() for o in orlist])
        except Exception as e:
            return jsonify("error" + str(e)), 500
    def add_bill(self):
        try:
            data = request.get_json()
            if not data:
                return jsonify("Dữ liệu không hợp lệ"), 400
            if not data.get('phone') or not data.get('address') or not data.get('recipient') or  not data.get('orders'):
                return jsonify(" Bạn cần cung cấp thêm thông tin thanh toán"), 400
            bill = Bill(
                recipient=data['recipient'],phone=data['phone'], address=data['address'],orders=data['orders'],
                total_price=int(data['total_price']),method = data["payment_method"],user_id=self.user  
            )
            self.db.session.add(bill)
            self.db.session.commit()
            return jsonify(" Đã thêm một đơn hàng mới!"), 200
        except Exception as e:
            return jsonify("error "+ str(e)), 500
