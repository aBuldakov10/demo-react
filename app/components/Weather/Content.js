import React, { useContext } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import {
  AccessTime,
  Air,
  ExploreOutlined,
  Opacity,
  RemoveRedEyeOutlined,
  SouthOutlined,
} from '@mui/icons-material';

import { getTime } from './index';
import { weatherIconUrl } from '../../pages/Weather/api';
import { WeatherContent } from '../../pages/Weather/Weather'; // Import context

const Content = () => {
  const {
    cityWeather,
    cityWeatherWeather,
    cityWeatherMain,
    cityWeatherClouds,
    cityWeatherSys,
    cityWeatherWind,
  } = useContext(WeatherContent);

  return (
    <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <Typography variant="h4" component="h1" style={{ fontWeight: 600 }}>
          {cityWeather.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '15px',
            fontSize: 14,
          }}
        >
          <AccessTime />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <time>current: {getTime()}</time>
            <time>data calculation: {getTime(cityWeather.dt)}</time>
          </Box>
        </Box>

        {cityWeatherWeather.map(({ description }, index) => {
          if (index > 0) {
            return false;
          }

          return (
            <span key={index} style={{ fontSize: 14 }}>
              Description: {description}
            </span>
          );
        })}
      </Box>

      <Divider sx={{ my: 3, borderColor: 'inherit' }} />

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '50px' }}>
        <div>
          <Box sx={{ display: 'inline-block', mr: 4, verticalAlign: 'middle' }}>
            <span style={{ fontSize: 52, fontWeight: 'bolder' }}>
              {Math.round(cityWeatherMain.temp)} &#8451;
            </span>
          </Box>

          <Box
            sx={{
              display: 'inline-block',
              verticalAlign: 'middle',
              mr: 4,
              width: 70,
              backgroundColor: '#8c8c8c',
              borderRadius: 50,
            }}
          >
            {cityWeatherWeather.map(({ icon, description }, index) => {
              if (index > 0) {
                return false;
              }

              return (
                <img
                  src={`${weatherIconUrl}/wn/${icon}@2x.png`}
                  alt="Weather-icon"
                  title={description}
                  key={index}
                />
              );
            })}
          </Box>

          <Box sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <span style={{ fontSize: 22 }}>
              Feels like{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {Math.round(cityWeatherMain.feels_like)} &#8451;
              </span>
            </span>

            <span style={{ display: 'block', fontSize: 14 }}>
              Clouds {cityWeatherClouds.all} %
            </span>
          </Box>
        </div>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            fontSize: 14,
          }}
        >
          <span>Sunrise: {getTime(cityWeatherSys.sunrise)}</span>
          <span>Sunset: {getTime(cityWeatherSys.sunset)}</span>
        </Box>
      </Box>

      <Divider sx={{ my: 3, borderColor: 'inherit' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Box sx={{ display: 'flex', gap: '15px' }}>
            <Air />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                mt: 0.25,
              }}
            >
              <span>speed: {cityWeatherWind.speed} m/s</span>

              {cityWeatherWind.gust ? (
                <span>gust: {cityWeatherWind.gust} m/s</span>
              ) : (
                ''
              )}
            </Box>
          </Box>

          <span
            style={{
              display: 'flex',
              transform: `rotate(${cityWeatherWind.deg}deg)`,
            }}
          >
            <SouthOutlined />
          </span>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RemoveRedEyeOutlined />{' '}
          {cityWeather.visibility >= 1000
            ? `${cityWeather.visibility / 1000} km`
            : `${cityWeather.visibility} m`}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Opacity /> <span>{cityWeatherMain.humidity} %</span>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ExploreOutlined /> {Math.round(cityWeatherMain.pressure / 1.333)}{' '}
          mmHg
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
