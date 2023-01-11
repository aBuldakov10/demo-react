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

import { sortedCities, fetchWeather, weatherIconUrl, getTime } from './index';

const Weather = () => {
  // State
  const [cityId, setCityId] = useState(658225);
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
            }}
          >
            {sortedCities.map(({ id, name }) => {
              return (
                <ListItem disablePadding key={id}>
                  <ListItemButton
                    data-city-id={id}
                    onClick={() => {
                      setCityId(id);
                    }}
                  >
                    <ListItemText primary={name} />
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
              p: 2,
              height: '100%',
              borderRadius: 2,
              bgcolor: '#fff',
            }}
          >
            <div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '50px',
                  pb: 2,
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
                  <span>Time:</span>

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
                  return (
                    <span key={index} style={{ fontSize: 14 }}>
                      Description: {description}
                    </span>
                  );
                })}
              </Box>

              <Divider style={{ marginBottom: 16 }} />

              <Box
                sx={{
                  pb: 2,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '50px',
                }}
              >
                <div>
                  <Box
                    sx={{
                      display: 'inline-block',
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
                      mr: 2,
                    }}
                  >
                    {cityWeatherWeather.map(({ icon, description }, index) => {
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

              <Divider style={{ marginBottom: 16 }} />

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
                    alignItems: 'flex-start',
                    gap: '15px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '15px',
                    }}
                  >
                    <span>Wind:</span>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                    >
                      <span>speed {cityWeatherWind.speed} m/s</span>

                      {cityWeatherWind.gust ? (
                        <span>gust {cityWeatherWind.gust} m/s</span>
                      ) : (
                        ''
                      )}
                    </Box>
                  </Box>

                  <span
                    style={{
                      transform: `rotate(${cityWeatherWind.deg}deg)`,
                      fontSize: 44,
                      lineHeight: 1,
                    }}
                  >
                    &#8595;
                  </span>
                </Box>
                <div>
                  Visibility:{' '}
                  {cityWeather.visibility >= 1000
                    ? `${cityWeather.visibility / 1000} km`
                    : `${cityWeather.visibility} m`}
                </div>
                <div>Humidity: {cityWeatherMain.humidity} %</div>
                <div>
                  Pressure: {Math.round(cityWeatherMain.pressure / 1.333)} mmHg
                </div>
              </Box>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weather;
