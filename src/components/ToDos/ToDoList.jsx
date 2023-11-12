import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Files
import './ToDos.scss';
import { doneTask } from './api';

// Store
import { taskListSelector } from '../../store/tasks/selectors';
import { openDeletePopup, openEditPopup, toggleDoneTask } from '../../store/tasks/actions';

const ToDoList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const taskList = useSelector(taskListSelector);

  return (
    <ul className="todo-list">
      {Object.values(taskList).map(({ id, title, description, createTime, isDone, isEdited }) => {
        const isDoneTask = isDone ? 'isDone' : 'done'; // Task done state
        const createDate = new Date(+createTime).toLocaleTimeString().slice(0, -3); // Create task time

        return (
          <li className="todo-list__item" key={id}>
            <Box data-task-id={id} className={`todo-list__task task-${isDoneTask}`}>
              {/*** Task title ***/}
              <h4 className="todo-list__task-title">
                <strong>#{id}.</strong> {title}
              </h4>

              {/*** Task description ***/}
              <Typography variant="body1" className="todo-list__task-description">
                {description}
              </Typography>

              {/*** Task info ***/}
              <Typography variant="body1" className="todo-list__task-info">
                {isEdited && <span style={{ color: '#777' }}>{t('to-do.edit.state')}</span>}
                <span>{createDate}</span>
              </Typography>

              {/*** Task action buttons ***/}
              <Box className="todo-list__task-actions">
                {/*** Done task ***/}
                <Button
                  variant="contained"
                  color={isDoneTask}
                  title={isDone ? t('to-do.done.tip-restore') : t('to-do.done.tip-done')}
                  onClick={() => doneTask(id).then((taskList) => dispatch(toggleDoneTask(taskList)))}
                >
                  <Done style={{ fontSize: 'inherit' }} />
                </Button>

                {/*** Edit task ***/}
                <Button
                  variant="contained"
                  color="primary"
                  title={t('to-do.edit.tip')}
                  disabled={isDone}
                  onClick={() => dispatch(openEditPopup(id, title, description))}
                >
                  <Edit style={{ fontSize: 'inherit' }} />
                </Button>

                {/*** Delete task ***/}
                <Button
                  variant="contained"
                  color="delete"
                  title={t('to-do.delete.tip')}
                  onClick={() => dispatch(openDeletePopup(id, title))}
                >
                  <Delete style={{ fontSize: 'inherit' }} />
                </Button>
              </Box>
            </Box>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
