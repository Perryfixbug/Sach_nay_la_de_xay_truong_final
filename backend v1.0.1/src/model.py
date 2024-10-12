from db import db
from sqlalchemy import Integer, String, Column, Float, Boolean, ForeignKey, BINARY
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta

class Product(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    img = Column(String(100), default='product_default')
    price = Column(String(30), nullable=False)
    author = Column(String(50), nullable=False)
    detail = Column(String(200), nullable=True)
    category = Column(String(50), nullable=False)
    stock = Column(Integer, default=1)
    #isPopular = Column(Boolean, default=False)
    pcarts = relationship('PCart', back_populates='product', lazy=True)
    orders = relationship('Order', back_populates='product', lazy=True) 
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'img': self.img,
            'price': self.price,
            'author': self.author,
            'detail': self.detail,
            'category': self.category,
            'stock': self.stock
            #'isPopular': self.isPopular
        }

class PCart(db.Model):
    id = Column(Integer, ForeignKey('product.id'), primary_key=True)
    date = Column(String(20), default=str(datetime.today().date()))
    quantity = Column(Integer, default=1)
    product = relationship('Product', back_populates='pcarts', lazy=True)
    def to_dict(self):
        if self.product:
            product_info = self.product
            return {
                'id': self.id,
                'name': product_info.name,
                'img': product_info.img,
                'price': product_info.price,
                'author': product_info.author,
                'date': self.date,
                'detail': product_info.detail,
                'category': product_info.category,
                'quantity': self.quantity
            }
        return {}

class User(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), nullable=False, unique=True)
    password = Column(BINARY, nullable=False)
    email_phone = Column(String(50), nullable=True)
    img = Column(String(100), default='user_default')
    point = Column(Integer, nullable=False, default=0)
    birthday = Column(String(20), default='None')
    gender = Column(String(10), default='None')
    purchased = Column(Integer, nullable=False, default=0)
    donations = Column(Integer, nullable=False, default=0)
    role = Column(Integer, nullable=False, default=0)  # 0 is user, 1 is admin
    orders = relationship('Order', back_populates='user', lazy=True) 
    def rank(self):
        if self.point > 5000:
            return "Kim Cuong"
        elif self.point > 3000: 
            return "Gold"
        elif self.point > 2000:
            return "Silver"
        elif self.point > 1000:
            return "Bronze"
        else:
            return "NewUser"
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email_phone': self.email_phone,
            'img': self.img,
            'point': self.point,
            'birthday': self.birthday,
            'gender': self.gender,
            'purchased': self.purchased,
            'donations': self.donations,
            'role': self.role
        }

class Order(db.Model):  
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    p_quantity = Column(Integer, default=1)
    orderdate = Column(String(20), default=str(datetime.today().date()))
    method = Column(String(20), default='truc tiep') 
    duedate = Column(String(20), default=str(datetime.today().date() + timedelta(days=7))) 
    status = Column(Integer, default=0)  # 0: not received, 1: received, 2: overdue
    recipient = Column(String(100))
    addrest = Column(String(100))
    phone = Column(String(20))
    product = relationship('Product', back_populates='orders', lazy=True) 
    user = relationship('User', back_populates='orders', lazy=True) 
    def show_product(self):
        
        return {
            "id": self.id,
            
        }
    def show_user(self):
        
        return {
            "id": self.id,
            "user_id": self.user_id,
            
        }
    def to_dict(self):
        in4p = self.product
        in4u = self.user
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "ppp": in4p.price,  
            "quantity": self.p_quantity,
            "stock": in4p.stock,

            "recipient": self.recipient,
            "addrest": self.addrest,
            "phone": self.phone,
            "method": self.method,
            "rank": in4u.rank(),

            "method": self.method,
            "orderdate": self.orderdate,
            "duedate": self.duedate
        }
