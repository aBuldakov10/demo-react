import React, { useCallback, useRef } from 'react';

// хук для отправки запроса через какое-то время после окончания ввода в input
const useDebounce = (callback, delay) => {
  const timer = useRef();

  // функция пересоздается только при изменении callback или delay
  // в финкции делаем setTimeout и если эта функция вызвалась еще раз, удаляем setTimeout и создаем заново
  const debouncedCallback = useCallback(
    (...args) => {
      // Если в поле current что-то есть, вызвать clearTimeout и очистить это поле
      if (timer.current) {
        clearTimeout(timer.current);
      }

      // В current поместить setTimeout с вызовом callback
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;

// // использование в компоненте
// const [value, setValue] = useState('');
// const debouncedSearch = useDebounce(search, 750);
//
// function search(query) {
//   fetch(`https://jsonplaceholder.typicode.com/todos?query=${query}`)
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// }
//
// const handleChange = (e) => {
//   setValue(e.target.value);
//   debouncedSearch(e.target.value);
// };
//
// <input type="text" value={value} onChange={handleChange} placeholder="placeholder" />;
