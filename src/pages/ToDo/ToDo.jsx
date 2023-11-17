import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import './ToDo.scss';
import { getTask } from '../../components/ToDos/api';

// Store
import { getTasks, loaded } from '../../store/tasks/actions';
import { taskListSelector, taskLoaderSelector } from '../../store/tasks/selectors';

// Components
import HeadPage from '../../components/HeadPage';
import ToDoList from '../../components/ToDos/ToDoList';
import CreateToDoTask from '../../components/ToDos/CreateToDoTask';
import DeleteToDoTask from '../../components/ToDos/DeleteToDoTask';
import EditToDoTask from '../../components/ToDos/EditToDoTask';
import Loader from '../../components/Loader/Loader';

const ToDo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loader = useSelector(taskLoaderSelector);
  const taskList = useSelector(taskListSelector);

  // Page head meta data
  const pageHeadData = {
    title: t('to-do.page.title'),
    description: t('to-do.page.description'),
    keywords: t('to-do.page.keywords'),
    bodyAttributes: { class: 'to-do-page' },
  };

  // Set task list state on load page
  useEffect(() => {
    getTask().then((taskList) => {
      dispatch(getTasks(taskList));
      dispatch(loaded());
    });
  }, []);

  return (
    <Box className="to-do" sx={{ py: 2 }}>
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={8}>
          {/*** Task list title ***/}
          <Typography variant="h6" component="h2" className="to-do__title">
            {t('to-do.task-list.title')}
          </Typography>

          {/*** Loader / No tasks notification / Task list ***/}
          {loader ? (
            <>
              <div>
                <Loader />
              </div>
            </>
          ) : Object.values(taskList).length === 0 ? (
            <Box className="to-do__no-tasks">
              <Typography variant="body1" align="center">
                {t('to-do.task-list.no-task')}
              </Typography>
            </Box>
          ) : (
            <>
              <ToDoList />
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Box className="task-form-wrapper">
            {/*** Task form title ***/}
            <Typography variant="h6" component="h2" className="to-do__title">
              {t('to-do.create.title')}
            </Typography>

            {/*** Create task form ***/}
            <CreateToDoTask />
          </Box>
        </Grid>
      </Grid>

      {/*** Confirmation delete task popup ***/}
      <DeleteToDoTask />

      {/*** Edit task popup ***/}
      <EditToDoTask />
    </Box>
  );
};

export default ToDo;
