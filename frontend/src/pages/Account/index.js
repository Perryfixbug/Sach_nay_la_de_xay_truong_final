import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from './Account.module.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import BackTo from '../../components/BackTo';
import Footer from '../../components/Footer';

const Account = () => {
  const [account, setAccount] = useState({});
  const [editingField, setEditingField] = useState(null); // Quản lý trường đang được chỉnh sửa
  const [tempValue, setTempValue] = useState(''); // Giá trị tạm thời cho trường đang chỉnh sửa
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountData = async () => {
      axios.defaults.withCredentials = true;
      const storedUser = localStorage.getItem('mess');
      if (storedUser) {
        const res = await axios.get('http://127.0.0.1:5000/account');
        setAccount(res.data);
      }
    };
    fetchAccountData();
  }, []);

  const handleFieldClick = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleFieldChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleFieldBlur = async () => {
    if (editingField) {
      const updatedAccount = { ...account, [editingField]: tempValue };
      console.log(updatedAccount);
      try {
        axios.defaults.withCredentials = true; // Thêm dòng này để cho phép gửi cookie
        await axios.put('http://127.0.0.1:5000/account', updatedAccount);
        
        setAccount(updatedAccount); // Cập nhật state với dữ liệu đã chỉnh sửa
      } catch (error) {
        console.error('Failed to save account data:', error);
      }
      setEditingField(null); // Kết thúc chỉnh sửa
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/account/logout');
      localStorage.removeItem('mess');
      localStorage.removeItem('access_token');
      navigate('/validation');
      window.location.reload();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Trường Ngày sinh - input kiểu date
  const renderBirthdayField = () => {
    return (
      <li>
        <p>Ngày sinh</p>
        {editingField === 'birthday' ? (
          <input
            type="date"
            value={tempValue}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur} // Lưu khi mất focus
            onKeyDown={(e) => e.key === 'Enter' && handleFieldBlur()} // Lưu khi nhấn Enter
            autoFocus
          />
        ) : (
          <p onClick={() => handleFieldClick('birthday', account.birthday || '')}>
            {account.birthday || 'Chưa có thông tin'}
          </p>
        )}
      </li>
    );
  };

  // Trường Giới tính - input kiểu select
  const renderGenderField = () => {
    return (
      <li>
        <p>Giới tính</p>
        {editingField === 'gender' ? (
          <select
            value={tempValue}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur} // Lưu khi mất focus
            autoFocus
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        ) : (
          <p onClick={() => handleFieldClick('gender', account.gender || '')}>
            {account.gender || 'Chưa có thông tin'}
          </p>
        )}
      </li>
    );
  };

  const renderField = (field, label) => {
    return (
      <li>
        <p>{label}</p>
        {editingField === field ? (
          <input
            type="text"
            value={tempValue}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur} // Lưu khi mất focus
            onKeyDown={(e) => e.key === 'Enter' && handleFieldBlur()} // Lưu khi nhấn Enter
            autoFocus
            style={{ textAlign: 'right' }} // Căn chỉnh văn bản về bên phải
          />
        ) : (
          <p onClick={() => handleFieldClick(field, account[field])}>
            {account[field] || 'Sửa'}
          </p>
        )}
      </li>
    );
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
      exit={{ x: 100, opacity: 0 }}
    >
      <BackTo />
      <div className={clsx(styles.avatar_site)}>
        <img src={account.img} alt={account.username} className={styles.avatar} />
        <h1>{account.username}</h1>
      </div>
      <div className={styles.info_site}>
        <ul className="d-flex-column">
          {renderField('email', 'Email')}
          {renderField('phone', 'Số điện thoại')}
          {renderBirthdayField()} {/* Ngày sinh */}
          {renderGenderField()} {/* Giới tính */}
        </ul>

        <ul className="d-flex-column">
          <li>
            <p>Số sách đã mua</p>
            <p>{account.books_purchased || '0'}</p> {/* Chỉ hiển thị, không cho chỉnh sửa */}
          </li>
          <li>
            <p>Số tiền đã quyên góp</p>
            <p>{account.donation_amount || '0'}</p> {/* Chỉ hiển thị, không cho chỉnh sửa */}
          </li>
        </ul>
      </div>
      <div className="d-flex-column">
        <button className={styles.logout} onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Account;
