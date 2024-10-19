import React, { useContext } from 'react'
import styles from './Category.module.css'
import Title from '../../components/Title'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider'
import ProductItem from '../../components/ProductItem'
import { motion } from 'framer-motion'

const Category = () => {
  const {category} = useParams()
  const [products] = useContext(DataContext)
  const list = products.filter(cur => cur.category.includes(category) || (category === 'Popular' && cur.isPopular == 1))
  return (
    <motion.div
      initial={{x: -100, opacity: 0}}
      animate={{x:0, opacity: 1}}
      transition={{
        duration: 0.2,
      }}
      exit={{x: 100, opacity: 0}}
    >
        <Title title={category}/>
        <div className={styles.product_list}>
          {
            list.map((cur, index) => (
                    <ProductItem.List
                      key={index}
                      product={cur}
                    />)
                )
          }
        </div>
    </motion.div>
  )
}

export default Category