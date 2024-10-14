from flask import jsonify, request
from model import Bill
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import re

class Bill_Option:
    def __init__(self, db: SQLAlchemy):
        self.db = db
        self.status = 4
        self.user = 0
    def get_user(self, u_id):
        self.user = u_id
    def get_bill(self, id = None):
        try:
            bill = Bill.query
            if id:
                bill = bill.get(id)
            elif self.status < 3:
                bill = bill.filter(Bill.status.__eq__(self.status))
            
            orlist = bill.all()
            if not len(orlist):
                return jsonify('Không tìm thấy đơn hàng nào theo yêu cầu') 
            return jsonify([o.to_dict() for o in orlist])
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    def add_bill(self):
        try:
            if not self.user:
                return jsonify('Bạn chưa đăng nhập tài khoản'),400
            data = request.get_json()
            if not data: 
                return jsonify({"error": "Invalid input"}), 400
            if not data.get('phone'):
                return jsonify('Bạn cần cung cấp thêm số điện thoại'), 400
            if not data.get('address') :
                return jsonify('Bạn cần cung cấp thêm địa chỉ nhận hàng'),400
            if not data.get('recipient'): 
                return jsonify('Bạn thiếu tên người nhận hàng'),400
            bill = Bill(    recipient = data['recipient'],
                            phone = data['phone'],
                            address = data['address'],
                            orders = data['orders'],
                            total_price = int(data['total_price']),
                            user_id = self.user
                           )
            self.db.session.add(bill)
            self.db.session.commit()
            return jsonify('Đã thêm một đơn hàng mới! '), 200
                
        except Exception as e:
            return jsonify({"error": str(e)}), 500