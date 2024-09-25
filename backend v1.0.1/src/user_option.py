from flask import jsonify,request
from model import User
from flask_sqlalchemy import SQLAlchemy
import hashlib
from image_path import save_image

class User_option:
    def __init__(self, db: SQLAlchemy) -> None:
        self.db = db
    def add_user(self): 
        username = request.form.get('username')
        password = request.form.get('password')
        email_phone= request.form.get('email_phone')
        re_password = request.form.get('re_password')
        img = 'default_user'
        # password = str(hashlib.md5(password.strip().encode('utf-8')).hexdigest())
        # re_password = str(hashlib.md5(re_password.strip().encode('utf-8')).hexdigest())

        if re_password != password:
            return jsonify('Mật khẩu không giống nhau'),400
        user = User (
            username = username,
            password = password,
            img = img,
            email_phone = email_phone
        )
        self.db.session.add(user)
        self.db.session.commit()
        return jsonify("Đã tạo tài khoản mới thành công")
    def delete_user(self):
        data = request.get_json()
        if not data: return jsonify({"error": "Invalid input"}), 400
        user = User.query.get(data['id'])
        if user:
            self.db.session.delete(user)
            self.db.session.commit()
            return jsonify({"message": f"Đã xóa tài khoản của bạn!"}), 200
        else:
            return jsonify({"error": "Người dùng không tồn tại"}), 404
        
    def login(self):
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter((User.username.__eq__(username))).first()
        if not user:
            return jsonify({"error": "Tên tài khoản không tồn tại"}), 404
        if user.password != password: 
            return jsonify({"error": "Mật khẩu không chính xác"}), 401
        return jsonify(user.to_dict()), 200
    def update_user(self):
        username = request.form.get('username')
        password = request.form.get('password')
        birthday = request.form .get('birthday')
        gender = request.form.get('gender')
        data = request.get_json()
        user = User.query.get(data['id'])
        if user :
            if username:
                user.username = username
            if password:
                user.password = password
            if birthday:
                user.birthday = birthday
            if gender:
                user.gender = gender
            self.db.session.commit()
            return jsonify('Đã cập nhập thay đổi của bạn')
        else:
            return jsonify('Người chơi không tồn tại')




        
