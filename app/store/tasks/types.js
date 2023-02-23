const namespace = 'TASKS';

// Get tasks
export const GET_TASKS = `${namespace}/GET`;

// Add new task
export const CREATE_TASK = `${namespace}/CREATE`;

// Toggle done task state
export const DONE_TASK = `${namespace}/TOGGLE_DONE`;

// Edit task
export const OPEN_EDIT_POPUP = `${namespace}/OPEN_EDIT_POPUP`;
export const CLOSE_EDIT_POPUP = `${namespace}/CLOSE_EDIT_POPUP`;
export const EDIT_TASK = `${namespace}/EDIT`;

// Delete task
export const OPEN_DELETE_POPUP = `${namespace}/OPEN_DELETE_POPUP`;
export const CLOSE_DELETE_POPUP = `${namespace}/CLOSE_DELETE_POPUP`;
export const DELETE_TASK = `${namespace}/DELETE`;
