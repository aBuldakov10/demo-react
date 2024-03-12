import React, { useEffect, useState } from 'react';

const useResize = () => {
  // создать брейкопинты
  const SCREEN_SM = 576;
  const SCREEN_MD = 768;
  const SCREEN_LG = 992;
  const SCREEN_XL = 1200;
  const SCREEN_XXL = 1400;

  const [width, setWidth] = useState(window.innerWidth); // состояние ширины

  useEffect(() => {
    const handleResize = (event) => setWidth(event.target.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isScreenSm: width >= SCREEN_SM,
    isScreenMd: width >= SCREEN_MD,
    isScreenLg: width >= SCREEN_LG,
    isScreenXl: width >= SCREEN_XL,
    isScreenXxl: width >= SCREEN_XXL,
  };
};

export default useResize;

// // использование в компоненте
// const { width, isScreenSm, isScreenMd, isScreenLg, isScreenXl } = useResize();
//
// <div className="App">
//   <p>width: {width}px</p>
//   <p>isScreenSm: {String(isScreenSm)}</p>
//   <p>isScreenMd: {String(isScreenMd)}</p>
//   <p>isScreenLg: {String(isScreenLg)}</p>
//   <p>isScreenXl: {String(isScreenXl)}</p>
// </div>
