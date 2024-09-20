import React, { useState } from 'react'
import styles from './Validation.module.css'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import BackTo from '../../components/BackTo'
import Title from '../../components/Title'

const Validation = () => {
    const [type, setType] = useState('Login')

    const Form = {
        Login(){
            return(
                <div className={clsx('d-flex-column', styles.form)}>
                    <Title title='Login'/>
                    <div className= {clsx ('d-flex-column', styles.input_site)}>
                        <label htmlFor='username'>Nhập email hoặc số điện thoại</label>
                        <input type='text' name='usenrname' id='username' placeholder='Email or phone...'/>
                        <label htmlFor='password'>Nhập mật khẩu</label>
                        <input type='password' name='password' id='password' placeholder='Password'/>
                    </div>
                    <div 
                        
                        className={styles.forgot}
                    >
                        <span style={{cursor: 'pointer'}}>Nhớ</span>
                        <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Quên mật khẩu</span>
                    </div>
                    <button>Đăng nhập</button>
                    <div 
                        style={{textDecoration: 'underline', cursor: 'pointer'}} 
                        onClick={()=>setType('Signup')}
                    >Đăng ký ngay</div>
                </div>
            )
        },
        Signup(){
            return(
                <div className={clsx('d-flex-column', styles.form)}>
                    <Title title='Signup'/>
                    <div className= {clsx ('d-flex-column', styles.input_site)}>
                        <label htmlFor='email_phone'>Nhập email hoặc số điện thoại</label>
                        <input type='text' name='email_phone' id='email_phone' placeholder='Email or phone...'/>
                        <label htmlFor='username'>Nhập tên của bạn</label>
                        <input type='text' name='username' id='username' placeholder='Nguyễn Văn A'/>
                        <label htmlFor='password'>Nhập mật khẩu</label>
                        <input type='password' name='password' id='password' placeholder='Password'/>
                        <label htmlFor='re_password'>Nhập lại mật khẩu</label>
                        <input type='password' name='re_password' id='re_password' placeholder='Rewrite password'/>
                    </div>
                    <button>Đăng ký</button>
                    <div 
                        style={{textDecoration: 'underline', cursor: 'pointer'}}
                        onClick={()=>setType('Login')}    
                    >Trở lại đăng nhập</div>
                </div>
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