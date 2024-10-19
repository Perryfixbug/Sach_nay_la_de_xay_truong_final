import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';

import './App.css';
import GlobalStyles from './components/GlobalStyles';
import TaskBar from './components/TaskBar';
import NavPage from './pages/NavPage';
import Search from './pages/SearchPage';
import Account from './pages/Account';
import AnimatedRoutes from './animatedRoutes';
import Validation from './pages/Validation';
import About from './pages/About';
import Category from './pages/Category';
import ScrollToTop from './components/ScrollToTop';
import Buy from './pages/Buy';


function App() {
  const location = useLocation()
  return (
    <AnimatedRoutes>
      <GlobalStyles>
        <ScrollToTop />
        <Routes location={location} key={location.path}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/product/:productId' element={<Product />}></Route>
          <Route path='/nav' element={<NavPage />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/validation' element={<Validation />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/:category' element={<Category />}></Route>
          <Route path='/search/:category' element={<Category />}></Route>
          <Route path='/buy' element={<Buy />} ></Route>
        </Routes>
        <TaskBar />
      </GlobalStyles>
    </AnimatedRoutes>
  );
}

export default App;
