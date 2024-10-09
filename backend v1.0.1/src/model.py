from db import db
from sqlalchemy import Integer, String, Column, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime,timedelta

class Product(db.Model):
    id = Column(String(20), primary_key=True)
    name = Column(String(100), nullable=False)
    img = Column(String(100), default= 'product_default')
    price = Column(Integer, nullable=False)
    author = Column(String(50), nullable=False)
    detail = Column(String(200), nullable=True)
    category = Column(String(50), nullable=False)
    stock = Column(Integer, default=1)
    isPopular = Column(Boolean, default= False)
    pcarts = relationship('PCart', back_populates='product', lazy = True)
    order = relationship('User', back_populates='product', lazy = True)
    def to_dict(self):
        return {
            'id': self.id,
            'name':self.name,
            'img':self.img,
            'price':f'{self.price:,.0f} VND',
            'author':self.author,
            'detail':self.detail,
            'category': self.category,
            'stock': self.stock,
            'isPopular': self.isPopular
        }


class PCart(db.Model):
    id = Column(String(20), ForeignKey('product.id'), primary_key=True)
    date = Column(String(20), default=datetime.today().date())
    quantity = Column(Integer, default=1)
    product = relationship('Product', back_populates='pcarts', lazy = True)
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
    id = Column(String(20), primary_key= True)
    username = Column(String(100),nullable=  False, unique= True)
    password = Column(String(100),nullable=  False)
    email_phone = Column(String(50),nullable=  True)
    img = Column(String(100),default= 'user_default')
    point = Column(Integer,nullable=  False, default= 0)
    birthday = Column(String(20), default= 'None')
    gender = Column(String(10),default= 'None')
    purchased = Column(Integer,nullable=  False, default= 0)
    donations = Column(Integer,nullable=  False, default= 0)
    role = Column(Integer,nullable=  False, default= 0) # 0 la user, 1 la admin
    order =relationship('Order', back_populates='user', lazy = True)
    def rank(self):
        if self.point > 5000:
            return "Kim Cuong"
        elif self.ponit > 3000:
            return "Gold"
        elif self.point > 2000:
            return "Silver"
        elif self.point > 1000:
            return "Bronze"
        else : 
            return "NewUser"
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'email_phone' : self.email_phone,
            'img' : self.img,
            'point': self.point,
            'birthday': self.birthday,
            'gender': self.gender,
            'purchased': self.purchased,
            'donations': self.donations,
            'role': self.role
        }

class Order:
    id = Column(String(20), primary_key= True)
    user_id = Column(String(20), nullable= False)
    product_id = Column (String(20), nullable = False)
    p_quantity = Column(Integer, default=1)
    orderdate = Column (String(20), default=datetime.today().date())
    method = Column (String(20), default= 'truc tiep') # online
    duedate = Column (String(20), default=lambda: (datetime.today().date() + timedelta(days=7)))
    status = Column (Integer, default= 0) #0: chua nhan, 1: da nhan don, 2 : qua han.
    recipient = Column (String(100))
    addrest = Column (String(100))
    phone = Column(String(20))
    product = relationship('Product', back_populates='order', lazy = True)
    user = relationship('User', back_populates='order', lazy = True)
    def show_product(self):
        in4p = self.product
        return {
            "id" : self.id,
            "product_id" : self.product_id,
            "ppp" : f'{in4p.price:,.0f} VND', # price per product
            "quantity": self.p_quantity,
            "stock": in4p.stock,
            "orderdate" : self.orderdate,
            "duedate" : self.duedate
        }
    def show_user(self):
        in4u = self.user
        return {
            "id" : self.id,
            "user_id" : self.user_id,
            "recipient": self.recipient,
            "addrest" : self.addrest,
            "phone" : self.phone,
            "method": self.method,
            "rank": in4u.rank()
        }
    def to_dict(self):
        return{
            "id" :self.id,
            "user_id": self.id,
            "product_id": self.product_id,
            "method": self.method,
            "orderdate": self.orderdate
        }

