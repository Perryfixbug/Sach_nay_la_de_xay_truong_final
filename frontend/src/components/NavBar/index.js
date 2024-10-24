import React from 'react'
import { useState, useEffect } from 'react'

import {assets} from '../../assets/assets'
import styles from './NavBar.module.css'
import Cart from '../../pages/Cart'
import Search from '../Search'
import About from '../../pages/About'
import Validation from '../../pages/Validation'
import Account from '../../pages/Account'
import NavPage from '../../pages/NavPage'
import { Link } from 'react-router-dom'
import { getCartItems } from '../CartAPI'
import Menu from '../Menu'

const NavBar = () => {
  const [value, setValue] = useState('')
  const [heart, setHeart] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems();
      setQuantity(cartItems ? cartItems.length : 0 );
    };
    fetchCartItems();
  }, []);
  
  const handleClickHeart = () => {
    setHeart(!heart);
    setClicked(true);
    setTimeout(() => setClicked(false), 500); // Đặt hiệu ứng "clicked" trở lại sau khi animation kết thúc
  };

  // Lấy thông tin người dùng từ localStorage khi trang chủ được render
  const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi trang chủ được render
        const storedUser = localStorage.getItem('mess');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
  return (
    <>
      <div className={styles.nav_desktop}>
          <Link to='/about' element={<About />} className='d-flex-center'>
            <img src={assets.heart_black} className='icon'/>
            Chúng tôi
          </Link>
          <div className={styles.logo}>
            <img src={assets.logo3} style={{height:60, width: 170, objectFit: 'contain'}}/>
          </div>
          <ul className={styles.nav_desktop_side}>
            <li>
              <Link to='/search' element={<Search />}><img src={assets.search_icon} className='icon'/></Link>
            </li>
            <li className='pos_relative'>
              <Link to='/cart' element={<Cart />}><img src={assets.shopping_cart_black} className='icon'/></Link>
              <div className={styles.quantity}>{quantity}</div>
            </li>
            <li>
              <Link to={user !== null ? '/account' : '/validation' } element={user !== null ? <Validation /> : <Account />}><img src={assets.account_black} className='icon'/></Link>  
            </li>
            <li>
              <Menu />
            </li>
          </ul>
      </div>
      <div className={styles.nav_mobile}>
        <input 
          type='text' 
          placeholder='Tìm kiếm' 
          className={styles.nav_mobile_search}
          value={value}
          onChange={(e)=>setValue(e.target.value)}
        />
        {value && <Search value={value} type='fast_search' />}
        <img 
                    className={styles.icon}
                    src={heart ? assets.heart_accent : assets.heart_black}
                    onClick={()=>handleClickHeart()}
                    
                />
      </div>
    </>
  )
}

export default NavBar