import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../../assets/assets';
import styles from './Menu.module.css';
import clsx from 'clsx';
import Category from '../../pages/Category';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const nav = ['Popular', 'Comedy', 'Adventure', 'Action', 'Fantasy', 'Sci Fi', 'Supernatural', 'Romance', 'Horror']
  return (
    <>
      {/* Toggle Button */}
      <div className={clsx(styles['toggle-button'], "d-flex-center")} onClick={toggleMenu}>
        <img src={assets.nav_icon} alt="Menu Icon" className='icon' />
        <span>MENU</span>
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
            <li key={cur}><Link to={cur} element={<Category />}>{cur}</Link></li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Menu;
