import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';
import styles from './Menu.module.css';
import clsx from 'clsx';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const nav = ['NỔI BẬT', 'SÁCH BỘ', 'VĂN HỌC', 'KINH TẾ', 'TÂM LÍ HỌC', 'TIỂU THUYẾT', 'KHOA HỌC']
  return (
    <>
      {/* Toggle Button */}
      <div className={clsx(styles['toggle-button'], "d-flex-center")} onClick={toggleMenu}>
        <img src={assets.nav_icon} alt="Menu Icon" className='icon' />
        MENU
      </div>

      {/* Menu with Framer Motion */}
      <motion.div
        className={clsx(styles.menu, { [styles.open]: isOpen })}
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5 }}
      >
        <button className={styles['close-btn']} onClick={toggleMenu}>×</button>
        <ul>
          {nav.map(cur=>(
            <li><a href='#'>{cur}</a></li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Menu;
