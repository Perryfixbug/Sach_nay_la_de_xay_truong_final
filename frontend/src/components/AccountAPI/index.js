import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/account';

// Đăng ký người dùng (Signup)
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData); // Gửi request đến /register
    console.log('User registered successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to register user:', error.response.data);
    return { error: error.response.data }; // Trả về thông báo lỗi
  }
};

// Đăng nhập người dùng (Login)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password }); // Gửi request đến endpoint login
    console.log('User logged in successfully:', response.data);
    localStorage.setItem('access_token', response.data.access_token); // Lưu token nếu cần
    return response.data;
  } catch (error) {
    console.error('Failed to log in:', error.response.data);
    return { error: error.response.data }; // Trả về thông báo lỗi
  }
};
