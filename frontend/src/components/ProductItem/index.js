import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductItem.module.css'
import {assets} from '../../assets/assets'
import Product from '../../pages/Product'
import { addToCart, removeFromCart } from '../CartAPI'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const ProductItem = {
    List({ product}){
        const handleAddToCart = (productId)=>{
            addToCart(productId)
            setDisplay(true)
            setTimeout(()=>{
                setDisplay(false)
            }, 1000) //sau 1 giây tự xóa hiệu ứng +1
        }
        const [display, setDisplay] = useState(false)   //hiệu ứng +1

        return (
            //Product Item in list
            <motion.div className={clsx(styles.productItems, 'hoverEffect')}>
                <Link to={`/product/${product.id}`} element={<Product id={product.id}/>}  >
                    <div>
                        <div className='d-flex-center'><img src={`http://localhost:5000/product_image/${product.id}`} className={styles.product_img}/></div>
                        <div className={styles.info}>
                            <div><h2 className={styles.name}>{product.name}</h2></div>
                            <div><h2 className={styles.price}>{product.price}</h2></div>
                        </div>
                    </div>
                </Link>
                    <img src={assets.add_cart_accent} 
                    onClick={()=>handleAddToCart(product.id)}
                    className={clsx(styles.add_cart_mobile)}/>
                    <div 
                        className={clsx(styles.add_cart_desktop, 'hoverEffect')}
                        onClick={()=>handleAddToCart(product.id)}
                    >Thêm vào giỏ</div>

                    {display && <motion.div 
                        initial={{x: '150px',  y: 0, opacity: 0}}
                        animate={{x: '150px', y: '-50px', opacity: 100}}
                        exit={{x:'150px', y: '-80px', opacity: 0}}
                        className={styles.addEffect}
                    >+1
                    </motion.div>}
            </motion.div>
        )
    },
    Search( {product}){
        return (
            <Link to={`/product/${product.id}`} element={<Product id={product.id}/>} className={clsx(styles.Item)}> 
                <div  className={styles.productItem_search}>
                    <img src={`http://localhost:5000/product_image/${product.id}`} />
                    <div className={styles.info}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <h2 className={styles.price}>{product.price}</h2>
                    </div>
                </div>
            </Link>
        )
    },
    Cart( {product} ){
        const [inCart, setInCart] = useState(true)
        const handleRemoveFromCart = (productId) =>{
            removeFromCart(productId)
            setInCart(false)
        }
        return (
            <>
            {inCart && <motion.div 
                className='pos_relative'>
                <Link to={`/product/${product.id}`} element={<Product id={product.id}/>}> 
                    <div  className={styles.productItem_cart}>
                        <img src={`http://localhost:5000/image_src/${product.id}`} />
                        <div className={styles.info}>
                            <h2 className={styles.name}>{product.name}</h2>
                            <h2 className={styles.price}>{product.price}</h2>
                            <strong className={styles.date}>Ngày thêm: {product.date}</strong>
                            <strong className={styles.quantity}>Số lượng: {product.quantity}</strong>
                        </div>
                    </div>
                </Link>
                <img 
                    src={assets.multiply_icon} style={{width: '30px', height: '30px', position: 'absolute', right: 200, top: 25}}
                    onClick={()=> handleRemoveFromCart(product.id)}
                />
            </motion.div>
            
            }
            </>
        )
    }
}

export default ProductItem