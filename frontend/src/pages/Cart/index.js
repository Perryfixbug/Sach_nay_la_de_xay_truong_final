import React, { useState, useEffect } from 'react';
import BackTo from '../../components/BackTo';
import { getCartItems, removeFromCart } from '../../components/CartAPI';
import { motion } from 'framer-motion';
import ProductItem from '../../components/ProductItem';
import styles from './Cart.module.css';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); // Sử dụng Set để lưu trữ ID của sản phẩm đã chọn
  const [totalPrice, setTotalPrice] = useState(0); // State để lưu tổng giá trị
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems();
      setCart(cartItems);
    };

    fetchCartItems();
  }, []);

  // Hàm để xử lý khi checkbox được thay đổi
  const handleCheckboxChange = (productId) => {
    setSelectedItems((prev) => {
      const updatedSelected = new Set(prev);
      if (updatedSelected.has(productId)) {
        updatedSelected.delete(productId); // Nếu đã chọn, thì bỏ chọn
      } else {
        updatedSelected.add(productId); // Nếu chưa chọn, thì thêm vào
      }
      return updatedSelected;
    });
  };

  // Hàm để chuyển đổi giá từ chuỗi sang số
  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9]/g, '')); // Loại bỏ tất cả ký tự không phải số
  };

  // Hàm để tính tổng giá trị của các sản phẩm được chọn
  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      if (selectedItems.has(item.id)) {
        total += parsePrice(item.price); // Giả sử mỗi sản phẩm có thuộc tính `price`
      }
    });
    setTotalPrice(total);
  };

  // Hàm để xóa sản phẩm đã chọn
  const handleRemoveSelectedItems = async () => {
    for (const itemId of selectedItems) {
      await removeFromCart(itemId); // Gọi API để xóa sản phẩm khỏi giỏ hàng
    }
    // Cập nhật lại giỏ hàng
    const updatedCart = cart.filter(item => !selectedItems.has(item.id));
    setCart(updatedCart);
    setSelectedItems(new Set()); // Đặt lại selectedItems về trạng thái ban đầu
    calculateTotalPrice(); // Tính lại tổng giá trị
  };

  useEffect(() => {
    calculateTotalPrice(); // Tính tổng giá trị khi có sự thay đổi trong selectedItems
  }, [selectedItems, cart]); // Chạy lại khi selectedItems hoặc cart thay đổi

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert('Bạn chưa chọn sản phẩm nào để thanh toán.');
      return;
    }

    // Lưu thông tin sản phẩm đã chọn vào localStorage hoặc state management như Redux
    const selectedProducts = cart.filter(item => selectedItems.has(item.id));

    // Chuyển hướng người dùng tới trang thanh toán, gửi thông tin sản phẩm đã chọn
    navigate('/buy', { state: { selectedProducts, totalPrice } });
  };

  return (
    <motion.div 
      className={styles.cart_page}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ y: -100, opacity: 0 }}
    >
      <Title title='Cart'/>
      <div className={styles.cart_list}>
        {cart.map((cur) => (
          <div key={cur.id} className={styles.product_item}>
            <input 
              type='checkbox' 
              checked={selectedItems.has(cur.id)} // Kiểm tra xem sản phẩm có được chọn hay không
              onChange={() => handleCheckboxChange(cur.id)} // Gọi hàm xử lý khi checkbox thay đổi
            />
            <ProductItem.Cart product={cur} />
          </div>  
        ))}
      </div>
      <div className={styles.item_selected}>
        <div className={styles.total_price}>
          <h3>Tổng giá trị: {totalPrice.toLocaleString()}đ</h3> {/* Hiển thị tổng giá trị với định dạng số */}
        </div>
        <button 
          className={styles.remove_button} 
          onClick={handleRemoveSelectedItems}
          disabled={selectedItems.size === 0} // Vô hiệu hóa nút nếu không có sản phẩm nào được chọn
        >
          Xóa sản phẩm đã chọn
        </button>
        <button 
          className={styles.checkout_button}
          onClick={() => handleCheckout()}
        >
          Thanh toán
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;
