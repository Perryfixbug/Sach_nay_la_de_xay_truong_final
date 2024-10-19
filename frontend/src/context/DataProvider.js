import React from 'react'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getCartItems } from '../components/CartAPI'
import { getUserData } from '../components/AccountAPI'

export const DataContext = createContext()

const DataProvider = ({children}) => {
  
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/product")
      .then(res=>res.json())
      .then(data=>{
        setProducts(data);
      })
  },[])

  useEffect(()=>{
    
  const fetchAccount = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.get('http://127.0.0.1:5000/account')
    setUserData(response.data)
  };

    fetchAccount()
  }, [])


  useEffect(()=>{
    const fetchCart = async()=>{
      const response = await axios.get('http://127.0.0.1:5000/cart')
      setCartItems(response.data)
    }
    
    fetchCart()
  }, [])
  
  
  return (
    <DataContext.Provider value={[products, userData, cartItems]}>
      {children}
    </DataContext.Provider>
  )
}


export default DataProvider