import React from 'react'
import Title from '../../components/Title'

import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div
      initial={{x: -100, opacity: 0}}
      animate={{x:0, opacity: 1}}
      transition={{
        duration: 0.2,
      }}
      exit={{x: 100, opacity: 0}}
    >
      <Title title='About us'/>
    </motion.div>
  )
}

export default About