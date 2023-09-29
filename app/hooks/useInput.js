import React, { useState } from 'react';

// Хук для изменения значения поля при вводе
const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => setValue(e.target.value); // при вводе записывается значение в состояние

  return { value, onChange };
};

export default useInput;

// // использование в компоненте
// // состояние
// const username = useInput();
//
// // элемент
// <input type="text" {...username} placeholder="placeholder" />;
