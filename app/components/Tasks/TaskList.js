import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Delete, Done, Edit } from '@mui/icons-material';

import '../../components/Tasks/Task.scss';
import { doneTask } from './api';
import { TaskListContext } from '../../pages/Tasks';

const TaskList = () => {
  const {
    taskList,
    setTaskList,
    setTaskId,
    setTaskTitle,
    setTaskDescription,
    setOpenEditPopup,
    setOpenDeletePopup,
  } = useContext(TaskListContext);

  return (
    <ul>
      {Object.values(taskList).map(
        ({ id, title, description, createTime, isDone, isEdited }, index) => {
          // Bottom spacing for task list item
          const itemSpacing =
            Object.values(taskList).length - 1 === index ? '' : 2;
          // Task done state
          const isDoneTask = isDone ? 'isDone' : 'done';
          // Mark task as edited
          const edited =
            isEdited && ' ' ? (
              <span style={{ color: '#777' }}>edited</span>
            ) : (
              ''
            );
          // Create task time
          const createDate = new Date(+createTime)
            .toLocaleTimeString()
            .slice(0, -3);

          return (
            <li key={id}>
              <Box
                data-task-id={id}
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  bgcolor: '#fff',
                  p: 2,
                  mb: itemSpacing,
                  boxShadow: '0px 2px 5px 0px #d2d2d2;',
                }}
                className={`task-${isDoneTask}`}
              >
                {/*** Task title ***/}
                <Typography
                  component="h4"
                  variant="body1"
                  sx={{ mb: '.75em', fontSize: '1.25rem', pr: 20 }}
                >
                  <strong>#{id}.</strong> {title}
                </Typography>

                {/*** Task description ***/}
                <Typography variant="body1" style={{ marginBottom: '.75em' }}>
                  {description}
                </Typography>

                {/*** Task info ***/}
                <Typography
                  variant="body1"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginBottom: 0,
                    fontSize: 12,
                    textDecoration: 'none',
                  }}
                >
                  {edited}
                  <span>{createDate}</span>
                </Typography>

                {/*** Task action buttons ***/}
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  {/*** Done task ***/}
                  <Button
                    variant="contained"
                    color={isDoneTask}
                    title="Done"
                    sx={{ minWidth: 'inherit', p: 1, ml: 2 }}
                    onClick={() => {
                      // Mark task as done and rerender task list
                      doneTask(id).then((taskList) => {
                        setTaskList(taskList);
                      });
                    }}
                  >
                    <Done style={{ fontSize: 'inherit' }} />
                  </Button>

                  {/*** Edit task ***/}
                  <Button
                    variant="contained"
                    color="primary"
                    title="Edit"
                    disabled={isDone}
                    sx={{ minWidth: 'inherit', p: 1, ml: 2 }}
                    onClick={() => {
                      setTaskId(id); // Set task id state for edit popup
                      setTaskTitle(title); // Set task title state for edit popup
                      setTaskDescription(description); // Set task description state for edit popup
                      setOpenEditPopup(true); // Open edit task popup
                    }}
                  >
                    <Edit style={{ fontSize: 'inherit' }} />
                  </Button>

                  {/*** Delete task ***/}
                  <Button
                    variant="contained"
                    color="delete"
                    title="Delete"
                    sx={{ minWidth: 'inherit', p: 1, ml: 2 }}
                    onClick={() => {
                      setTaskId(id); // Set task id state for delete popup
                      setTaskTitle(title); // Set task title state for delete popup
                      setOpenDeletePopup(true); // Open confirmation delete popup
                    }}
                  >
                    <Delete style={{ fontSize: 'inherit' }} />
                  </Button>
                </Box>
              </Box>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default TaskList;
