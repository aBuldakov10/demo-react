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
