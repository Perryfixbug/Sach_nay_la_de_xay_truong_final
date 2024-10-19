import React, { useEffect } from 'react';
import Title from '../../components/Title';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    // Gọi lại Facebook SDK khi component đã được render
    if (window.FB) {
      window.FB.XFBML.parse();  // SDK này sẽ tìm và render các plugin Facebook
    }
  }, []); // Chỉ gọi một lần sau khi component được mount

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
      exit={{ x: 100, opacity: 0 }}
    >
      <Title title='About us' />
      
    </motion.div>
  );
};

export default About;
