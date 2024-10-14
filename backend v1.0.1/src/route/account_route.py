from flask import request, jsonify, Blueprint, current_app, session

acc_route = Blueprint('acc_route', __name__)

@acc_route.route('/account/register', methods=['POST'])
def signup():
    return current_app.config['AccOption'].add_user()

@acc_route.route('/account', methods=['POST', 'DELETE', 'GET'])
def account():
    if request.method == 'POST':
        return handle_login()

    if request.method == 'DELETE':
        return handle_delete_user()

    if request.method == 'GET':
        return handle_get_profile()

def handle_login():
    mes, err = current_app.config['AccOption'].login()
    if err == 200:
        session['uid'] = mes
        session.permanent = True  
        print('Giá trị uid lưu trong session:', session['uid'])
        current_app.config['cartOption'].get_usercart(session['uid'])
        current_app.config['billOption'].get_user(session['uid'])
        return jsonify("Đăng nhập thành công"), err
    else:
        return jsonify(mes), err


def handle_delete_user():
    uid = session.get('uid')  # Kiểm tra uid từ session
    if not uid:
        return jsonify("Bạn chưa đăng nhập!"), 401
    return current_app.config['AccOption'].delete_user()

def handle_get_profile():
    uid = session.get('uid')  # Lấy uid từ session
    print("Session hiện tại:", session)  # Debug giá trị session
    if not uid:
        return jsonify("Vui lòng đăng nhập để truy cập hồ sơ của bạn!"), 401
    user_info = current_app.config['AccOption'].profile(uid)
    return user_info


@acc_route.route('/account/logout', methods=['GET'])
def logout():
    # Xóa uid khỏi session khi đăng xuất
    session.pop('uid', None)  # Xóa uid từ session
    return jsonify("Đăng xuất thành công")

@acc_route.route('/test/g_session', methods=['GET'])
def get_session():
    return jsonify(session.get('uid'))
@acc_route.route('/test/c_session')
def creat_session():
    session['uid'] = '2'
    return jsonify('Tạo session thành công')