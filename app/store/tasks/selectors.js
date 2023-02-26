export const taskListSelector = ({ tasks }) => {
  return tasks.taskList;
};

export const deletePopupSelector = ({ tasks }) => {
  return {
    id: tasks.deletePopup.id,
    title: tasks.deletePopup.title,
    state: tasks.deletePopup.isOpen,
  };
};

export const editPopupSelector = ({ tasks }) => {
  return {
    id: tasks.editPopup.id,
    title: tasks.editPopup.title,
    description: tasks.editPopup.description,
    state: tasks.editPopup.isOpen,
  };
};

export const taskLoaderSelector = ({ tasks }) => {
  return tasks.taskLoader;
};
