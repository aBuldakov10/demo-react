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

const initialTasksState = {
  taskLoader: true,
  taskList: {},
  editPopup: {
    id: null,
    title: '',
    description: '',
    isOpen: false,
  },
  deletePopup: {
    id: null,
    title: '',
    isOpen: false,
  },
};

export const taskReducer = (state = initialTasksState, action) => {
  if (action.type === GET_TASKS) {
    return {
      ...state,
      taskList: { ...action.taskList },
    };
  }

  if (action.type === CREATE_TASK) {
    return {
      ...state,
      taskList: { ...action.taskList },
    };
  }

  if (action.type === DONE_TASK) {
    return {
      ...state,
      taskList: { ...action.taskList },
    };
  }

  // Delete conditions
  if (action.type === OPEN_DELETE_POPUP) {
    return {
      ...state,
      deletePopup: {
        id: action.id,
        title: action.title,
        isOpen: true,
      },
    };
  }

  if (action.type === CLOSE_DELETE_POPUP) {
    return {
      ...state,
      deletePopup: {
        ...state.deletePopup,
        isOpen: false,
      },
    };
  }

  if (action.type === DELETE_TASK) {
    return {
      ...state,
      taskList: { ...action.taskList },
    };
  }

  // Edit conditions
  if (action.type === OPEN_EDIT_POPUP) {
    return {
      ...state,
      editPopup: {
        id: action.id,
        title: action.title,
        description: action.description,
        isOpen: true,
      },
    };
  }

  if (action.type === CLOSE_EDIT_POPUP) {
    return {
      ...state,
      editPopup: {
        ...state.editPopup,
        isOpen: false,
      },
    };
  }

  if (action.type === EDIT_TASK) {
    return {
      ...state,
      taskList: { ...action.taskList },
    };
  }

  // Loader
  if (action.type === LOADING) {
    return {
      ...state,
      taskLoader: action.loading,
    };
  }

  if (action.type === LOADED) {
    return {
      ...state,
      taskLoader: action.loading,
    };
  }

  return state;
};
