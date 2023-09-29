import React, { useEffect, useState } from 'react';

// Хук для запросов. загрузка, данные, ошибка
const useRequest = (request) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    request()
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
};

export default useRequest;

// // использование в компоненте
// const [todos, loading, error] = useRequest(fetchToDo);
//
// function fetchToDo() {
//   return axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=5`);
// }
//
// if (loading) {
//   return <div>Загрузка...</div>;
// }
//
// if (error) {
//   return <div>Ошибка</div>;
// }
//
// {todos &&
// todos.map((item) => (
//   <div key={item.id} style={{ padding: 30, border: '1px solid black' }}>
//     {item.id}. {item.title}
//   </div>
// ))}
