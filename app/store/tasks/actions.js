import {
  CLOSE_DELETE_POPUP,
  CLOSE_EDIT_POPUP,
  CREATE_TASK,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  GET_TASKS,
  LOADED,
  LOADING,
  OPEN_DELETE_POPUP,
  OPEN_EDIT_POPUP,
} from './types';

export const getTasks = (taskList) => {
  return {
    type: GET_TASKS,
    taskList,
  };
};

export const addTask = (taskList) => {
  return {
    type: CREATE_TASK,
    taskList,
  };
};

export const toggleDoneTask = (taskList) => {
  return {
    type: DONE_TASK,
    taskList,
  };
};

/*** Delete task ***/
export const openDeletePopup = (id, title) => {
  return {
    type: OPEN_DELETE_POPUP,
    id,
    title,
  };
};

export const closeDeletePopup = () => {
  return {
    type: CLOSE_DELETE_POPUP,
  };
};

export const removeTask = (taskList) => {
  return {
    type: DELETE_TASK,
    taskList,
  };
};

/*** Edit popup ***/
export const openEditPopup = (id, title, description) => {
  return {
    type: OPEN_EDIT_POPUP,
    id,
    title,
    description,
  };
};

export const closeEditPopup = () => {
  return {
    type: CLOSE_EDIT_POPUP,
  };
};

export const updateTask = (taskList) => {
  return {
    type: EDIT_TASK,
    taskList,
  };
};

/*** Loader ***/
export const loading = () => {
  return {
    type: LOADING,
    loading: true,
  };
};

export const loaded = () => {
  return {
    type: LOADED,
    loading: false,
  };
};
