from flask import jsonify,request
from model import User
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import re
from image_path import save_image

class User_option:
    def __init__(self, db: SQLAlchemy) -> None:
        self.db = db
    def add_user(self): 
        try:
            data = request.get_json() 
            if not data:
                return jsonify("  Invalid input"), 400
            username = data['username']
            password = data['password'] 
            email_phone = data['email_phone']
            re_password = data['repass']
            if not username or not password or not email_phone or not re_password:
                return jsonify(" Cần nhập đầy đủ thông tin."), 400
            existing_user = User.query.filter((User.email_phone == email_phone)).first()
            if existing_user:
                print('co roi')
                return jsonify(' email hoặc số điện thoại này đã đăng kí cho một tài khoản khác'),400
            if len(password) < 8: 
                return jsonify(' Mật khẩu phải có tối thiểu 8 kí tự'),400
            has_letter = re.search(r'[a-zA-Z]', password) is not None
            has_digit = re.search(r'\d', password) is not None
            if not ( has_letter and has_digit):
                return jsonify(' Mật khẩu phải bao gồm cả chữ cái và chữ số'),400
            
            if re_password != password:
                return jsonify("  Mật khẩu không giống nhau"), 400

            # Băm mật khẩu
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            # Tạo một đối tượng User
            user = User(
                username=username,
                password=hashed_password,  # Lưu mật khẩu đã băm ở dạng bytes
                img='default_user.jpg',  # Hình ảnh mặc định
                email_phone=email_phone
            )

            self.db.session.add(user)
            self.db.session.commit()
            return jsonify("message: Đã tạo tài khoản mới thành công"), 201  # Trả về mã 201 khi tạo thành công

        except Exception as e:
            self.db.session.rollback()  
            return jsonify("  " + str(e)), 500  # Trả về lỗi nếu có

    def delete_user(self):
        data = request.get_json()
        if not data: return jsonify("  Invalid input"), 400
        user = User.query.get(data['id'])
        if user:
            self.db.session.delete(user)
            self.db.session.commit()
            return jsonify(" Đã xóa tài khoản của bạn!"), 200
        else:
            return jsonify(" Người dùng không tồn tại"), 404
        
    def login(self):
        try:
            data = request.get_json()
            if not data:
                return jsonify("  Invalid input"), 400
            password = data['password'] 
            email = data['email']
            user = User.query.filter((User.email_phone.__eq__(email))).first()
        except Exception as e:
            return jsonify("  " + str(e)), 500  # Trả về lỗi nếu có
        if not user:
            return jsonify(" Tên tài khoản không tồn tại"), 404
        
        # Kiểm tra mật khẩu
        if not bcrypt.checkpw(password.encode('utf-8'), user.password): 
            return jsonify(" Mật khẩu không chính xác"), 401

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




        
