import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';
import { AccessTime, Air, ExploreOutlined, Opacity, RemoveRedEyeOutlined, SouthOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Files
import './Content.scss';

import { getTime } from './index';
import { weatherIconUrl } from '../../../pages/Weather/api';

// Store
import { cityWeatherSelector } from '../../../store/weather/selectors';

const Content = () => {
  const { t } = useTranslation();
  const { name, dt, weather, main, clouds, sys, wind, visibility } = useSelector(cityWeatherSelector);
  const visibleDistance =
    visibility >= 1000
      ? `${visibility / 1000} ${t('weather.visible-unit-km')}`
      : `${visibility} ${t('weather.visible-unit-m')}`;

  return (
    <Box className="weather-content">
      {/*** Heading ***/}
      <Box className="weather-content__item weather-heading">
        {/* City */}
        <Typography variant="h4" component="h1" style={{ fontWeight: 600 }}>
          {name}
        </Typography>

        {/* Time */}
        <Box className="weather-time" title="time">
          <AccessTime />

          <Box>
            <time>
              {t('weather.current-time')} {getTime()}
            </time>
            <time>
              {t('weather.data-calc')} {getTime(dt)}
            </time>
          </Box>
        </Box>

        {/* Description */}
        {weather.map(({ id, description }, index) => {
          if (index > 0) return;

          return (
            <span key={id} style={{ fontSize: 14 }}>
              {t('weather.weather-desc')} {description}
            </span>
          );
        })}
      </Box>

      <Divider className="weather-content__divider" />

      {/*** Body ***/}
      <Box className="weather-content__item weather-body">
        {/* Temperature */}
        <Box className="weather-temp">
          <span className="weather-temperature">{Math.round(main.temp)} &#8451;</span>

          <Box className="weather-icon">
            {weather.map(({ id, icon, description }, index) => {
              if (index > 0) return;

              return (
                <img src={`${weatherIconUrl}/wn/${icon}@2x.png`} alt="Weather-icon" title={description} key={id} />
              );
            })}
          </Box>

          <Box className="weather-feels">
            <div style={{ fontSize: 22 }}>
              {t('weather.feels-like')}{' '}
              <span style={{ fontWeight: 'bolder' }}>{Math.round(main.feels_like)} &#8451;</span>
            </div>

            <div style={{ fontSize: 14 }}>
              {t('weather.clouds')} {clouds.all} %
            </div>
          </Box>
        </Box>

        {/* Sun */}
        <Box>
          <div>
            {t('weather.sunrise')} {getTime(sys.sunrise)}
          </div>
          <div>
            {t('weather.sunset')} {getTime(sys.sunset)}
          </div>
        </Box>
      </Box>

      <Divider className="weather-content__divider" />

      {/*** Informers ***/}
      <Box className="weather-content__item weather-informers">
        {/* Wind */}
        <Box className="weather-informers__item weather-wind" title="wind">
          <Box className="weather-wind__info">
            <Air />

            <Box>
              <div>
                {t('weather.speed')} {wind.speed} {t('weather.wind-unit')}
              </div>
              {wind.gust && (
                <div>
                  {t('weather.gust')} {wind.gust} {t('weather.wind-unit')}
                </div>
              )}
            </Box>
          </Box>

          <Box className="weather-wind__direction" sx={{ transform: `rotate(${wind.deg}deg)` }} title="wind direction">
            <SouthOutlined />
          </Box>
        </Box>

        {/* Visibility */}
        <Box className="weather-informers__item" title="visibility">
          <RemoveRedEyeOutlined /> {visibleDistance}
        </Box>

        {/* Humidity */}
        <Box className="weather-informers__item" title="humidity">
          <Opacity /> <span>{main.humidity} %</span>
        </Box>

        {/* Pressure */}
        <Box className="weather-informers__item" title="pressure">
          <ExploreOutlined /> {Math.round(main.pressure / 1.333)} {t('weather.pressure-unit')}
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
