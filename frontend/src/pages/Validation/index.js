import React, { useState } from 'react'
import styles from './Validation.module.css'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx'
import BackTo from '../../components/BackTo'
import Title from '../../components/Title'
import { signupUser, loginUser } from '../../components/AccountAPI'; // Import API đăng ký

const Validation = () => {
    const [type, setType] = useState('Login')
    const navigate = useNavigate();

    const Form = {
        Login(){
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');

            const handleSubmit = async (e) => {
                e.preventDefault();
                const response = await loginUser(email, password); // Gửi dữ liệu tới API login
                if (response.error) {
                    alert(response.error); // Hiển thị lỗi nếu có
                } else {
                    alert(response)
                    // Lưu thông tin người dùng và token vào localStorage (hoặc sessionStorage)
                    localStorage.setItem('mess', JSON.stringify(response)); // Giả sử response chứa thông tin người dùng
                    console.log(localStorage.getItem('mess'));
                    
                    // Chuyển hướng người dùng đến trang chủ
                    navigate('/');
                }
            };
            return(
                <form 
                    className={clsx('d-flex-column', styles.form)}
                    onSubmit={handleSubmit}
                >
                    <Title title='Login'/>
                    <div className= {clsx ('d-flex-column', styles.input_site)}>
                        <label htmlFor='username' >Nhập email hoặc số điện thoại</label>
                        <input 
                            type='text' 
                            name='usenrname' 
                            id='username' 
                            placeholder='Email or phone...' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor='password'>Nhập mật khẩu</label>
                        <input 
                            type='password' 
                            name='password' 
                            id='password' 
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div 
                        
                        className={styles.forgot}
                    >
                        <span style={{cursor: 'pointer'}}>Nhớ</span>
                        <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Quên mật khẩu</span>
                    </div>
                    <button type='submit'>Đăng nhập</button>
                    <div 
                        style={{textDecoration: 'underline', cursor: 'pointer'}} 
                        onClick={()=>setType('Signup')}
                    >Đăng ký ngay</div>
                </form>
            )
        },
        Signup(){
            const [userData, setUserData] = useState({
                email: '',
                username: '',
                password: '',
                repass: '',
              });
            const handleChange = (e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              };
            
              const handleSubmit = async (e) => {
                e.preventDefault();
                const response = await signupUser(userData); // Gửi dữ liệu tới API signup
                if (response.error) {
                    alert(response.error.message || JSON.stringify(response.error)); // Hiển thị lỗi nếu có
                } else {
                  alert('Đăng ký thành công');
                }
              };
            return(
                <form 
                    className={clsx('d-flex-column', styles.form)}
                    onSubmit={handleSubmit}
                >
                    <Title title='Signup'/>
                    <div className= {clsx ('d-flex-column', styles.input_site)}>
                        <label htmlFor='email_phone'>Nhập email hoặc số điện thoại</label>
                        <input type='text' name='email_phone' id='email_phone' placeholder='Email or phone...' onChange={handleChange}/>
                        <label htmlFor='username'>Nhập tên của bạn</label>
                        <input type='text' name='username' id='username' placeholder='Nguyễn Văn A' onChange={handleChange}/>
                        <label htmlFor='password'>Nhập mật khẩu</label>
                        <input type='password' name='password' id='password' placeholder='Password' onChange={handleChange}/>
                        <label htmlFor='re_password'>Nhập lại mật khẩu</label>
                        <input type='password' name='repass' id='repass' placeholder='Rewrite password' onChange={handleChange}/>
                    </div>
                    <button>Đăng ký</button>
                    <div 
                        style={{textDecoration: 'underline', cursor: 'pointer'}}
                        onClick={()=>setType('Login')}    
                    >Trở lại đăng nhập</div>
                </form>
            )
        }
    }
    
    const ComponentForm = Form[type]

    return (
        <motion.div 
            initial={{x: -100, opacity: 0}}
            animate={{x:0, opacity: 1}}
            transition={{
                duration: 0.2,
            }}
            exit={{x: 100, opacity: 0}}
            className={styles.validation}
        >   
            <ComponentForm />
        </motion.div>
  )
}

export default Validation