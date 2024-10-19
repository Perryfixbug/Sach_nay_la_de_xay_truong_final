import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import {DataContext} from '../../context/DataProvider'
import ProductItem from '../ProductItem'
import styles from './ProductList.module.css'
import { assets } from '../../assets/assets'
import Category from '../../pages/Category'


const ProductList = () => {
  const [products] = useContext(DataContext)
  const nav = ['Popular', 'Comedy', 'Adventure', 'Action', 'Fantasy', 'Sci Fi', 'Supernatural', 'Romance', 'Horror']
  
  const containerRefs = useRef([]);

  useEffect(() => {
    const handleWheel = (e, index) => {
      e.preventDefault();
      const container = containerRefs.current[index];
      if (container) {
        const scrollSpeed = 3.5 //scrollSpeed giảm dần, lấy deltaY/scrollSpeed
        const maxScroll = container.scrollWidth - container.clientWidth;     //méo hiểu lắm
        container.scrollLeft = Math.max(Math.min(container.scrollLeft + e.deltaY/scrollSpeed, maxScroll), 0);
      }
    };

    // Add event listeners for each scrollable container
    containerRefs.current.forEach((ref, index) => {
      if (ref) {
        const wheelHandler = (e) => handleWheel(e, index);
        ref.addEventListener('wheel', wheelHandler, { passive: false });

        // Cleanup on unmount
        return () => {
          ref.removeEventListener('wheel', wheelHandler);
        };
      }
    });
  }); // Empty dependency array to ensure it runs once on mount

  return (
    <div className={styles.productContainer}>
      {nav.map((title, title_key) => {
        // const list = products
        const list = products.filter(cur => (cur.category.includes(title) || (title === 'Popular' && cur.isPopular == 1)) ) 
        const limitedList = list.slice(0, 15);
        return (
          list.length !== 0 ? (
            <div 
              key={title_key}
            >
              <div className={styles.title}>{title}</div>
              <div 
                className={styles.product_list} 
                ref={el => containerRefs.current[title_key] = el}
              >
                {
                  limitedList.map((cur, index) => (
                    <ProductItem.List
                      key={index}
                      product={cur}
                    />)
                  )
                }
                <div className={styles.more_desktop}><Link to={title} element={<Category />}><img src={assets.more_accent}/></Link></div>
              </div>
              <div className={styles.more_mobile}><Link to={title} element={<Category />}>Xem thêm</Link></div>
            </div>
          ) : null
        )
      })}
    </div>
  )
}

export default ProductList