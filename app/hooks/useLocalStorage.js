import React, { useState, useEffect } from 'react';

// Хук для хранения значения в localStorage. аналог корзины
const useLocalStorage = (key, initialValue = '') => {
  // функция возвращает значение из localStorage, если оно есть или значение переданное в аргументе
  const getValue = () => {
    const storage = localStorage.getItem(key); // string || null

    if (storage) return JSON.parse(storage); // '[]', '{}', ''

    return initialValue;
  };

  const [value, setValue] = useState(getValue); // состояние хука

  // при изменении значения оно добавляется в localStorage
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);

  return [value, setValue];
};

export default useLocalStorage;

// // использование в компоненте
// const [order, setOrder] = useLocalStorage('order', []);
//
// // при клике записать в localStorage обновленное значение
// <button onClick={() => setOrder([...order, ['item']])}>Add item</button>;
