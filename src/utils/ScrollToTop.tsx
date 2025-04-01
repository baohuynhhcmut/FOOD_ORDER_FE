import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll về đầu trang
  }, [location]); // Khi `location` thay đổi, scroll về đầu

  return null; // Component này không cần render gì cả
};

export default ScrollToTop;