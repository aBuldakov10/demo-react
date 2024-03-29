import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import './Timer.scss';
import { convertTime, initTimerState } from './index';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(initTimerState); // full time left in seconds
  const timerLeftRef = useRef(null);
  const { t } = useTranslation();

  const daysLeft = timeLeft / 60 / 60 / 24; // days left decimal (days)
  const hoursLeftSec = timeLeft / 60 / 60; // full hours left decimal (seconds)
  const hoursLeft = (daysLeft - Math.trunc(daysLeft)) * 24; // hours left decimal (hours)
  const minutesLeftSec = timeLeft / 60; // full minutes left decimal (seconds)
  const minutesLeft = (hoursLeftSec - Math.trunc(hoursLeftSec)) * 60; // minutes left decimal (minutes)
  const secondsLeft = (minutesLeftSec - Math.trunc(minutesLeftSec)) * 60; // seconds left decimal (seconds)

  useEffect(() => {
    // Timer function
    const timer = () => {
      setTimeout(() => {
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));

        timer();
      }, 1000);

      return timeLeft;
    };

    if (timerLeftRef.current !== null) return;

    timerLeftRef.current = timer();
  }, []);

  return (
    <Box className="timer-block">
      <Typography variant="h4" component="h4" align={'center'}>
        {t('timer.title')}
      </Typography>

      <Box className="timer">
        <Box className="timer__item">
          <span className="timer__value days">{convertTime(daysLeft)}</span>
          <span className="timer__label">{t('timer.day')}</span>
        </Box>

        <Box className="timer__item">
          <span className="timer__value hours">{convertTime(hoursLeft)}</span>
          <span className="timer__label">{t('timer.hours')}</span>
        </Box>

        <Box className="timer__item">
          <span className="timer__value minutes">{convertTime(minutesLeft)}</span>
          <span className="timer__label">{t('timer.minutes')}</span>
        </Box>

        <Box className="timer__item">
          <span className="timer__value seconds">{convertTime(secondsLeft)}</span>
          <span className="timer__label">{t('timer.seconds')}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default Timer;
