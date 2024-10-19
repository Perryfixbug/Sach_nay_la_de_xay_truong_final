import React, { useContext, useState } from 'react';
import Title from '../../components/Title';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';
import styles from './Buy.module.css';
import { DataContext } from '../../context/DataProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Buy = () => {
  const [a, userData, c] = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProducts = location.state.selectedProducts; // Lấy thông tin sản phẩm đã chọn từ giỏ hàng
  const shippingFee = 30000; // Giả sử phí ship là 30,000đ
  const [isEditingInfo, setIsEditingInfo] = useState(false); // Thay đổi trạng thái để xác định xem có đang chỉnh sửa không
  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Mặc định là thanh toán khi nhận hàng
  
  // Tính tổng giá trị sản phẩm đã chọn
  const totalProductPrice = selectedProducts.reduce((total, product) => {
    return total + (parseFloat(product.price.replace(/\./g, '').replace('đ', '').trim()) || 0)*product.quantity; // Chuyển đổi chuỗi sang số
  }, 0);

  const totalPrice = totalProductPrice + shippingFee; // Tổng tiền thanh toán

  // Hàm để thay đổi thông tin người nhận hàng
  const handleChangeInfo = () => {
    setIsEditingInfo(true);
    setNewName(userData.username); // Đặt tên hiện tại vào input
    setNewPhone(userData.phone); // Đặt số điện thoại hiện tại vào input
    setNewAddress(userData.location); // Đặt địa chỉ hiện tại vào input
  };

  const handlePlaceOrder = async () => {
    try {
      // Chuẩn bị dữ liệu đơn hàng để gửi lên server
      const orderData = {
        recipient: userData.username,
        phone: userData.phone,
        address: userData.location,
        // Biến orders thành một chuỗi với các sản phẩm được ngăn cách bằng dấu xuống dòng
        orders: selectedProducts.map(product => 
          `Product: ${product.name}, Quantity: ${product.quantity || 1}, Price: ${product.price}`
        ).join('\n'),  // Mỗi đơn hàng sẽ được ngăn cách bằng dấu xuống dòng
        total_price: totalPrice,
        payment_method: paymentMethod
      };

      // Gửi yêu cầu POST lên server
      const response = await axios.post('http://localhost:5000/bill', orderData);

      if (response.status === 200) {
        alert('Đặt hàng thành công!');
        navigate('/'); // Chuyển hướng sau khi đặt hàng thành công
      }
    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
      alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
    }
};


  const handleInfoSubmit = () => {
    if (newName) userData.username = newName; // Thay đổi tên trong userData
    if (newPhone) userData.phone = newPhone; // Thay đổi số điện thoại trong userData
    if (newAddress) userData.location = newAddress; // Thay đổi địa chỉ trong userData
    setIsEditingInfo(false); // Đóng input sau khi xác nhận
  };

  const formatPrice = (price) => {
    return price ? `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ` : '0đ'; // Định dạng giá với dấu phân cách
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ x: 100, opacity: 0 }}
      className={styles.buy_container}
    >
      <Title title="Thanh toán" />
      
      {/* Thông tin người nhận hàng */}
      <div className={styles.info}>
        <div className={styles.user_info_title}>
          <img src={assets.location_accent} className='icon' alt="location icon" />
          <p>Thông tin người nhận</p>
        </div>
        <div className={styles.user_info_content}>
          {isEditingInfo ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)} // Cập nhật tên mới
                placeholder="Tên người nhận"
              />
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)} // Cập nhật số điện thoại mới
                placeholder="Số điện thoại"
              />
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)} // Cập nhật địa chỉ mới
                placeholder="Địa chỉ nhận hàng"
              />
              <button onClick={handleInfoSubmit}>Xác nhận</button>
            </>
          ) : (
            <>
              <p>{userData.username}</p>
              <p>{userData.phone}</p>
              <p>{userData.location}</p>
              <button onClick={handleChangeInfo}>Thay đổi</button>
            </>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className={styles.product_info_title}>
          <img src={assets.add_cart_accent} className='icon' alt="cart icon" />
          <p>Sản phẩm</p>
        </div>
        <div className={styles.product_info_content}>
          {selectedProducts.map(product => {
            // Tính thành tiền cho mỗi sản phẩm
            const productPrice = parseFloat(product.price.replace(/\./g, '').replace('đ', '').trim()) || 0;
            const quantity = product.quantity || 1; // Số lượng sản phẩm
            const totalProductCost = productPrice * quantity; // Thành tiền cho sản phẩm
            
            return (
              <div key={product.id} className={styles.product_item}>
                <img src={`http://localhost:5000/product_image/${product.id}`} alt={product.name} />
                <div className={styles.product_name}>{product.name}</div>
                <div>{product.price} {/* Hiển thị giá nguyên vẹn */}</div>
                <div>{quantity}</div>
                <div>{formatPrice(totalProductCost)} {/* Hiển thị thành tiền */}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thông tin hóa đơn và phương thức thanh toán */}
      <div className={styles.bill}>
        <div className={styles.payment_choices}>
          <div>Phương thức thanh toán</div>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)} // Cập nhật phương thức thanh toán
          >
            <option value="COD">Thanh toán khi nhận hàng</option>
            <option value="VnPay">VnPay</option>
            <option value="MOMO">MOMO</option>
          </select>
        </div>
        <div className={styles.bill_info}>
          <p>Tổng tiền hàng: {formatPrice(totalProductPrice)} {/* Hiển thị tổng tiền hàng */}</p>
          <p>Phí ship: {formatPrice(shippingFee)} {/* Hiển thị phí ship */}</p>
          <p>Tổng thanh toán: {formatPrice(totalPrice)} {/* Hiển thị tổng thanh toán */}</p>
        </div>
        <button onClick={handlePlaceOrder}>Đặt hàng</button>
      </div>
    </motion.div>
  );
};

export default Buy;
