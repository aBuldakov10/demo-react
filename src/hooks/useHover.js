import React, { useEffect, useState } from 'react';

// Хук для изменения элемента при наведении
const useHover = (ref) => {
  const [isHover, setIsHover] = useState(false); // состояние наведенного элемента

  // функции изменения состояние наведенного элемента
  const on = () => setIsHover(true);
  const off = () => setIsHover(false);

  useEffect(() => {
    const element = ref.current;

    // проверить наличие элемента, на который вешается хук
    if (!element) {
      return;
    }

    // слушатели для элемента
    element.addEventListener('mouseenter', on); // наведение
    element.addEventListener('mousemove', on); // движение внутри
    element.addEventListener('mouseleave', off); // выход за пределы

    // удалить слушатели при размонтровании компонента
    return () => {
      element.removeEventListener('mouseenter', on);
      element.removeEventListener('mousemove', on);
      element.removeEventListener('mouseleave', off);
    };
  }, []);

  return isHover; // true || false
};

export default useHover;

// // использование в компоненте
// const hoverElementRef = useRef();
// const isHover = useHover(hoverElementRef);
//
// <div
//   ref={hoverElementRef}
//   className={isHover ? 'is-hover' : ''}
//   style={{ width: 100, height: 100, border: '1px solid #000' }}
// />;
