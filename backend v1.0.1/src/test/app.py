from flask import Flask, session

app = Flask(__name__)
app.secret_key = 'supersecretkey'

@app.route('/')
def index():
    session['user_id'] = '12345'
    return 'Đã lưu session user_id'

@app.route('/get')
def get_session():
    user_id = session.get('user_id', 'Không có user_id trong session')
    return f'User ID: {user_id}'

if __name__ == '__main__':
    app.run(debug=True)
