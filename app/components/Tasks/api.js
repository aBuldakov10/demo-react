const host = 'https://task-list-a8n9.onrender.com';

/*** Get tasks on load ***/
export const getTask = async () => {
  const data = await fetch(`${host}/tasks`);

  console.log(await data.json());
};

getTask();

/*** Create task ***/
export const addTask = async (body) => {
  const data = await fetch(`${host}/tasks`, {
    method: 'POST',
    body,
  });

  return await data.json();
};
