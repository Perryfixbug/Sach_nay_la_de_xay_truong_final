import axios from 'axios';

const API_URL = 'https://sach-nay-la-de-xay-truong-api.onrender.com/account';

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
    const response = await axios.post(API_URL, { email, password }, { withCredentials: true }); //Them vao { withCredentials: true }// Gửi request đến endpoint login
    console.log('User logged in successfully:', response.data);
    localStorage.setItem('access_token', response.data.access_token); // Lưu token nếu cần
    return response.data;
  } catch (error) {
    console.error('Failed to log in:', error.response.data);
    return { error: error.response.data }; // Trả về thông báo lỗi
  }
};

// Lấy thông tin người dùng từ localStorage
export const getUserData = async () => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.get(API_URL);    //await đợi đến khi response được return mới thực hiện tiếp
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null; // Trả về null nếu không có thông tin người dùng
  }
};

// Đăng xuất (xoá thông tin người dùng và token khỏi localStorage)
export const logoutUser = () => {
  localStorage.removeItem('access_token'); // Xoá token
  localStorage.removeItem('user'); // Xoá thông tin người dùng
  console.log('User logged out successfully');
};