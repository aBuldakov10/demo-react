import React, { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) callback();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
};

export default useClickOutside;

// // использование в компоненте
// const ref = useRef(null);
// const callback = () => {
//     console.log('click outside');
//   };
//   useClickOutside(ref, callback);

// return <div ref={ref}>click out this elem</div>;
