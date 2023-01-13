import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

import {
  AccessTime,
  Air,
  Opacity,
  ExploreOutlined,
  RemoveRedEyeOutlined,
  SouthOutlined,
} from '@mui/icons-material';

import './Weather.scss';
import imgBg from './weather-bg.jpg';
import { sortedCities, fetchWeather, weatherIconUrl, getTime } from './index';

const Weather = () => {
  // State
  const [cityId, setCityId] = useState(658225);
  const [cityActive, setCityActive] = useState(false);
  const [cityWeather, setCityWeather] = useState({});
  const [cityWeatherMain, setCityWeatherMain] = useState({});
  const [cityWeatherClouds, setCityWeatherClouds] = useState({});
  const [cityWeatherSys, setCityWeatherSys] = useState({});
  const [cityWeatherWind, setCityWeatherWind] = useState({});
  const [cityWeatherWeather, setCityWeatherWeather] = useState([]);

  // Set city weather state
  useEffect(() => {
    fetchWeather(cityId).then((cityWeather) => {
      setCityWeather(cityWeather);
      setCityWeatherMain(cityWeather.main);
      setCityWeatherClouds(cityWeather.clouds);
      setCityWeatherSys(cityWeather.sys);
      setCityWeatherWind(cityWeather.wind);
      setCityWeatherWeather(cityWeather.weather);
    });
  }, [cityId]);

  return (
    <Box sx={{ py: 2 }}>
      <Grid className="weather" container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <List
            className="weather__list"
            sx={{
              borderRadius: 2,
              bgcolor: '#fff',
              overflow: 'hidden',
            }}
            disablePadding={true}
          >
            {sortedCities.map(({ id, name }, index) => {
              return (
                <ListItem disablePadding key={id}>
                  <ListItemButton
                    selected={cityActive === index}
                    data-city-id={id}
                    onClick={() => {
                      setCityId(id);
                      setCityActive(index);
                    }}
                  >
                    <ListItemText primary={name} sx={{ my: 0 }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>

        <Grid item xs={12} md={6} lg={9}>
          <Box
            className="weather__content"
            sx={{
              position: 'relative',
              p: 3,
              height: '100%',
              borderRadius: 2,
              bgcolor: '#fff',
              backgroundImage: `url(${imgBg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                color: '#fff',
                opacity: 0.8,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '50px',
                  pb: 3,
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  style={{ fontWeight: 600 }}
                >
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

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
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

              <Divider style={{ marginBottom: 24 }} />

              <Box
                sx={{
                  pb: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '50px',
                }}
              >
                <div>
                  <Box
                    sx={{
                      display: 'inline-block',
                      mr: 4,
                      verticalAlign: 'middle',
                    }}
                  >
                    <span style={{ fontSize: 52, fontWeight: 'bolder' }}>
                      {Math.round(cityWeatherMain.temp)} &#8451;
                    </span>

                    {/*<div>*/}
                    {/*  <span>min: {cityWeatherMain.temp_min}</span>*/}
                    {/*  <span>max: {cityWeatherMain.temp_max}</span>*/}
                    {/*</div>*/}
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

                  <Box
                    sx={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  >
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

              <Divider style={{ marginBottom: 24 }} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '15px',
                    }}
                  >
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

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <RemoveRedEyeOutlined />{' '}
                  {cityWeather.visibility >= 1000
                    ? `${cityWeather.visibility / 1000} km`
                    : `${cityWeather.visibility} m`}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <Opacity /> <span>{cityWeatherMain.humidity} %</span>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <ExploreOutlined />{' '}
                  {Math.round(cityWeatherMain.pressure / 1.333)} mmHg
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weather;
