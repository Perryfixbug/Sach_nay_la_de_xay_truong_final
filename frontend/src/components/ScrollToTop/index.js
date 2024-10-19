import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Di chuyển đến vị trí (0, 0) - đầu trang
  }, [pathname]); // Mỗi khi 'pathname' thay đổi, sẽ kích hoạt hiệu ứng

  return null;
}

export default ScrollToTop;
