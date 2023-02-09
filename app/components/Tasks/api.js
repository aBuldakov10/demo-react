const host = 'https://task-list-a8n9.onrender.com';

/*** Get tasks on load ***/
export const getTask = async () => {
  const data = await fetch(`${host}/tasks`);

  return await data.json();
};

/*** Create task ***/
export const createTask = async (body) => {
  const data = await fetch(`${host}/tasks`, {
    method: 'POST',
    body,
  });

  return await data.json();
};

/*** Delete task ***/
export const deleteTask = async (id) => {
  const data = await fetch(`${host}/tasks/${id}`, {
    method: 'DELETE',
  });

  return await data.json();
};

/*** Done task ***/
export const doneTask = async (id) => {
  const data = await fetch(`${host}/tasks/done/${id}`, {
    method: 'PATCH',
  });

  return await data.json();
};
