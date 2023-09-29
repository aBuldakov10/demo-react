import React, { useEffect, useRef } from 'react';

// Хук для подгрузки элементов списка при скролле
const useScroll = (parentRef, childRef, callback) => {
  const observer = useRef(); // отслеживает появление элемента в зоне видимости браузера

  useEffect(() => {
    const options = {
      root: parentRef.current, // элемент, со скроллом
      rootMargin: '0px',
      // threshold. насколько надо пересечь элемент для срабатывания колбек.
      // 0 - элемент только появился в зоне видимости, 1 - должен появить полностью
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback();
      }
    }, options);

    observer.current.observe(childRef.current);

    return function () {
      observer.current.unobserve(childRef.current);
    };
  }, [callback]);
};

export default useScroll;

// // использование в компоненте
// const [todos, setTodos] = useState([]); // список задач для рендера
// const [page, setPage] = useState(1); // блок с задачами с лимитом
// const limit = 20; // по сколько показывать задачи
// const parentRef = useRef(); // элемент, внутри которого будет прокрутка
// const childRef = useRef(); // элемент, который должен появиться в области видимости браузера для вызова колбека
// const intersected = useScroll(parentRef, childRef, () => {
//   fetchToDo(page, limit);
// });
//
// function fetchToDo(page, limit) {
//   fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
//     .then((response) => response.json())
//     .then((json) => {
//       setTodos((prev) => [...prev, ...json]);
//       setPage((prev) => prev + 1);
//     });
// }
//
// // элемент, в котором будет скролится список
// <div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
//   {todos.map((item) => (
//     <div key={item.id} style={{ padding: 30, border: '1px solid black' }}>
//       {item.id}. {item.title}
//     </div>
//   ))}
//
//   <div ref={childRef} />
// </div>
