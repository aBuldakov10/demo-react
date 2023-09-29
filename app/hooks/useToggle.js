import React, { useState } from 'react';

// Хук для переключения состояния видимости элемента
const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
};

export default useToggle;

// // использование в компоненте
// const [isVisible, toggleVisible] = useToggle(true);
//
// <button onClick={toggleVisible}>toggle btn</button>
// {isVisible && <p>toggle text</p>}
