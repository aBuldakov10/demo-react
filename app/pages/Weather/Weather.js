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
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material';
import {
  AccessTime,
  Air,
  Opacity,
  ExploreOutlined,
  RemoveRedEyeOutlined,
  SouthOutlined,
  LocationOn,
} from '@mui/icons-material';

import './Weather.scss';
import imgBg from './weather-bg.jpg';
import {
  sortedCities,
  fetchWeather,
  weatherIconUrl,
  getTime,
  chooseMyCity,
} from './index';

const Weather = () => {
  // General states
  const [cityId, setCityId] = useState(524894);
  const [cityActive, setCityActive] = useState(false); // Active selected city
  const [isLoading, setIsLoading] = useState(true); // Loader state

  // Location states
  const [isLocation, setIsLocation] = useState(false); // Use if location btn click
  const [locationCoordinates, setLocationCoordinates] = useState({}); // Use location coordinates in message
  const [isLocationEnabled, setIsLocationEnabled] = useState(true); // Location enable state
  const [locationErrorMessage, setLocationErrorMessage] = useState(''); // Show message if location disabled

  // Weather data states
  const [cityWeather, setCityWeather] = useState({});
  const [cityWeatherMain, setCityWeatherMain] = useState({});
  const [cityWeatherClouds, setCityWeatherClouds] = useState({});
  const [cityWeatherSys, setCityWeatherSys] = useState({});
  const [cityWeatherWind, setCityWeatherWind] = useState({});
  const [cityWeatherWeather, setCityWeatherWeather] = useState([]);

  // Set city weather state
  useEffect(() => {
    setIsLoading(true);

    fetchWeather(cityId).then((cityWeather) => {
      setIsLoading(false);
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
              borderRadius: 1,
              bgcolor: '#fff',
              overflow: 'hidden',
              py: 2,
            }}
          >
            {sortedCities.map(({ id, name, country }, index) => {
              return (
                <ListItem disablePadding key={id}>
                  <ListItemButton
                    selected={cityActive === index}
                    data-city-id={id}
                    sx={{ px: 3 }}
                    onClick={() => {
                      setIsLocation(false); // Set if not location weather
                      setCityId(id); // Get weather data
                      setCityActive(index); // Change active city
                    }}
                  >
                    <ListItemText
                      primary={`${name} (${country})`}
                      sx={{ my: 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Button
            variant="contained"
            color="custom"
            endIcon={<LocationOn />}
            sx={{
              marginTop: 2,
              width: '100%',
              fontSize: '16px',
              textTransform: 'none',
            }}
            onClick={async () => {
              const locationData = await chooseMyCity(); // Get location error or location data if enabled

              // Disabled location
              if (Array.isArray(locationData) && !locationData[0]) {
                const [locationResult, errorMessage] = locationData;

                setIsLocation(true); // Location btn was clicked
                setIsLocationEnabled(locationResult); // Set false state - location disabled
                setLocationErrorMessage(errorMessage);

                return;
              }

              // Enabled location
              setIsLoading(true); // Fix location notification
              setLocationCoordinates(locationData[1]); // Show location coordinates in its own message
              setCityId(locationData[0]); // Get weather location data
              setCityActive(false); // Disable active city state
              setIsLocation(true); // Is location data state
              setIsLocationEnabled(true); // Set true state - location enabled
            }}
          >
            My location
          </Button>
        </Grid>

        <Grid item xs={12} md={6} lg={9}>
          <Box
            className="weather__content"
            sx={{
              position: 'relative',
              p: 3,
              height: '100%',
              borderRadius: 1,
              color: '#fff',
              backgroundImage: `url(${imgBg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              overflow: 'hidden',
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <>
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

                  <Divider
                    style={{
                      marginTop: 24,
                      marginBottom: 24,
                      borderColor: 'inherit',
                    }}
                  />

                  <Box
                    sx={{
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
                        {cityWeatherWeather.map(
                          ({ icon, description }, index) => {
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
                          }
                        )}
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

                  <Divider
                    style={{
                      marginTop: 24,
                      marginBottom: 24,
                      borderColor: 'inherit',
                    }}
                  />

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

                {/*** Location notification ***/}
                {!isLocation ? (
                  ''
                ) : (
                  <Box>
                    <Divider
                      style={{
                        marginTop: 24,
                        marginBottom: 24,
                        borderColor: 'inherit',
                      }}
                    />

                    {isLocationEnabled ? (
                      <Alert
                        severity="info"
                        variant="outlined"
                        style={{ backgroundColor: '#fff' }}
                      >
                        <AlertTitle>Notification</AlertTitle>
                        {`Your location is: latitude ${locationCoordinates.lat} and longitude ${locationCoordinates.lon}. The nearest weather data location is ${cityWeather.name}`}
                      </Alert>
                    ) : (
                      <Alert
                        severity="warning"
                        variant="outlined"
                        style={{ backgroundColor: '#fff' }}
                      >
                        <AlertTitle>{locationErrorMessage}</AlertTitle>
                        You should to enable geolocation in your browser to see
                        your weather location data
                      </Alert>
                    )}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weather;
