import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';
import {
  AccessTime,
  Air,
  ExploreOutlined,
  Opacity,
  RemoveRedEyeOutlined,
  SouthOutlined,
} from '@mui/icons-material';

// Files
import { getTime } from './index';
import { weatherIconUrl } from '../../pages/Weather/api';

// Store
import { cityWeatherSelector } from '../../store/weather/selectors';

const Content = () => {
  const { name, dt, weather, main, clouds, sys, wind, visibility } =
    useSelector(cityWeatherSelector);
  const visibleDistance =
    visibility >= 1000 ? `${visibility / 1000} km` : `${visibility} m`;

  return (
    <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <Typography variant="h4" component="h1" style={{ fontWeight: 600 }}>
          {name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '15px',
            fontSize: 14,
          }}
          title="time"
        >
          <AccessTime />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <time>current: {getTime()}</time>
            <time>data calculation: {getTime(dt)}</time>
          </Box>
        </Box>

        {weather.map(({ id, description }, index) => {
          if (index > 0) {
            return false;
          }

          return (
            <span key={id} style={{ fontSize: 14 }}>
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
              {Math.round(main.temp)} &#8451;
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
            {weather.map(({ id, icon, description }, index) => {
              if (index > 0) {
                return false;
              }

              return (
                <img
                  src={`${weatherIconUrl}/wn/${icon}@2x.png`}
                  alt="Weather-icon"
                  title={description}
                  key={id}
                />
              );
            })}
          </Box>

          <Box sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <span style={{ fontSize: 22 }}>
              Feels like{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {Math.round(main.feels_like)} &#8451;
              </span>
            </span>

            <span style={{ display: 'block', fontSize: 14 }}>
              Clouds {clouds.all} %
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
          <span>Sunrise: {getTime(sys.sunrise)}</span>
          <span>Sunset: {getTime(sys.sunset)}</span>
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
          <Box sx={{ display: 'flex', gap: '15px' }} title="wind">
            <Air />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                mt: 0.25,
              }}
            >
              <span>speed: {wind.speed} m/s</span>
              {wind.gust && <span>gust: {wind.gust} m/s</span>}
            </Box>
          </Box>

          <span
            style={{
              display: 'flex',
              transform: `rotate(${wind.deg}deg)`,
            }}
            title="wind direction"
          >
            <SouthOutlined />
          </span>
        </Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}
          title="visibility"
        >
          <RemoveRedEyeOutlined /> {visibleDistance}
        </Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}
          title="humidity"
        >
          <Opacity /> <span>{main.humidity} %</span>
        </Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}
          title="pressure"
        >
          <ExploreOutlined /> {Math.round(main.pressure / 1.333)} mmHg
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
