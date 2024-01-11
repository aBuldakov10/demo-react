/*** Sort orders ***/
export const sortOrdersFn = (ordersList, orderField, direction) => {
  const sortByNumber = orderField === 'id' || orderField === 'date' || orderField === 'sum';
  let result;

  // Sort by id, date, sum
  if (sortByNumber) {
    result =
      direction === 'asc'
        ? [...ordersList].sort((first, second) => +first[orderField] - +second[orderField])
        : [...ordersList].sort((first, second) => +second[orderField] - +first[orderField]);
  }

  // Sort by order title
  if (orderField === 'title') {
    result =
      direction === 'asc'
        ? [...ordersList].sort((first, second) => first.title.localeCompare(second.title))
        : [...ordersList].sort((first, second) => second.title.localeCompare(first.title));
  }

  // Sort by client name
  if (orderField === 'client') {
    result =
      direction === 'asc'
        ? [...ordersList].sort((first, second) => first.client.name.localeCompare(second.client.name))
        : [...ordersList].sort((first, second) => second.client.name.localeCompare(first.client.name));
  }

  return result;
};

/*** Search order function ***/
// принимает объект заказов, в котором надо искать, и объект с искомой строкой
export const searchOrder = (searchData) => {
  const searchSrc = JSON.parse(sessionStorage.getItem('orders')); // get orders from session storage
  const newOrdersObj = {}; // новый объект заказов
  let newOrdersObjKey = 1; // первый ключ объекта заказов
  let newOrdersObjValue = []; // первое значение объекта заказов

  // отфильтрованный массив с именами клиента в соответствии с поисковым запросом
  const ordersSrcSearch = Object.values(searchSrc)
    .flat() // развернуть многомерный массив в одномерный массив
    .filter((item) => item.client.name.toLowerCase().includes(searchData.searchOrder.toLowerCase()));

  // сформировать новый объект заказов после поиска
  ordersSrcSearch.forEach((item) => {
    // если массив полный (4 элемента), очистить массив и увеличить ключ на 1
    if (newOrdersObjValue.length === 4) {
      newOrdersObjValue = [];
      newOrdersObjKey++;
    }

    newOrdersObjValue.push(item); // добавить заказ в массив значений объекта
    newOrdersObj[newOrdersObjKey] = newOrdersObjValue; // добавить значение объекта соответствующему ключу
  });

  return newOrdersObj; // возвращает объект всех заказов после поиска
};

/*** Add new order function ***/
// принимает данные формы в виде объекта
export const createOrder = (newOrderData) => {
  const createOrderDate = Date.now(); // get current date
  const storageOrders = JSON.parse(sessionStorage.getItem('orders')); // get orders from session storage
  const ordersPagesCount = +Object.keys(storageOrders).reverse()[0]; // find orders object last key
  let generateId; // новый id заказа

  // создать id, увеличенный на 1 от максимального, или сгенеровать новый, если объект orders пустой
  if (Object.keys(storageOrders).length) {
    generateId =
      Object.values(storageOrders)
        .flat() // развернуть многомерный массив в одномерный массив
        // найти объект в максимальным id и получить его id увеличенный на 1
        .reduce((acc, prev) => (acc.id > prev.id ? acc : prev)).id + 1;
  } else {
    // сгенерировать случайное 4х-значное число от 1000 до 9999
    generateId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  // create new order object
  const newOrderObj = {
    id: generateId,
    title: newOrderData.orderName,
    date: createOrderDate,
    client: {
      name: newOrderData.clientName,
      email: newOrderData.clientEmail,
    },
    sum: newOrderData.orderSum,
  };

  // создать новый ключ с пустым массивом, если значения последнего ключа заполнены полсностью
  if (storageOrders[ordersPagesCount] && storageOrders[ordersPagesCount].length === 4)
    storageOrders[ordersPagesCount + 1] = [];

  // добавить объект заказов в массив последнего ключа или создать новый
  if (Object.keys(storageOrders).length) {
    // добавить new order object в массив последнего ключа
    storageOrders[+Object.keys(storageOrders).reverse()[0]].push(newOrderObj);
  } else {
    storageOrders[1] = [newOrderObj]; // добавить new order object в пустой массив, когда объект заказов пустой
  }

  sessionStorage.setItem('orders', JSON.stringify(storageOrders)); // set to storage

  return storageOrders; // возвращает объект всех заказов после создания нового заказа
};

/*** Edit order input options ***/
export const orderNameOpt = {
  required: 'Required field',
  minLength: { value: 5, message: 'Minimum 5 symbols' },
};

export const clientNameOpt = {
  required: 'Required field',
  minLength: { value: 5, message: 'Minimum 5 symbols' },
};

export const clientEmailOpt = {
  required: 'Required field',
  pattern: {
    value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gm,
    message: 'Enter correct email',
  },
  minLength: { value: 7, message: 'Minimum 7 symbols' },
};

export const orderSumOpt = {
  required: 'Required field',
  pattern: {
    value: /^[0-9]+([.,][0-9]{2})?$/gm,
    message: 'Enter correct format sum number like 0 or 0.00',
  },
};

/*** Delete order function ***/
export const deleteOrder = (selectedOrders) => {
  const storageOrders = JSON.parse(sessionStorage.getItem('orders')); // get orders from session storage
  const newOrdersObj = {}; // новый объект заказов
  let newOrdersObjKey = 1; // первый ключ объекта заказов
  let newOrdersObjValue = []; // первое значение объекта заказов

  // сформировать массив всех заказов после удаления
  const newOrdersArr = Object.values(storageOrders)
    .flat() // развернуть многомерный массив в одномерный массив
    .filter((item) => !selectedOrders.includes(item.id)); // отфильтровать массив заказов. без выбранных для удаления

  // сформировать новый объект заказов после удаления
  newOrdersArr.forEach((item) => {
    // если массив полный (4 элемента), очистить массив и увеличить ключ на 1
    if (newOrdersObjValue.length === 4) {
      newOrdersObjValue = [];
      newOrdersObjKey++;
    }

    newOrdersObjValue.push(item); // добавить заказ в массив значений объекта
    newOrdersObj[newOrdersObjKey] = newOrdersObjValue; // добавить значение объекта соответствующему ключу
  });

  sessionStorage.setItem('orders', JSON.stringify(newOrdersObj)); // set to storage

  return newOrdersObj; // возвращает объект всех заказов после удаления заказов
};
