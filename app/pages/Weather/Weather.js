import React, { createContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, CircularProgress } from '@mui/material';

import './Weather.scss';
import imgBg from './weather-bg.jpg';
import { fetchWeather } from './api';

import CityList from '../../components/Weather/CityList';
import LocationButton from '../../components/WeatherLocation/LocationButton';
import LocationNotification from '../../components/WeatherLocation/LocationNotification';
import Content from '../../components/Weather/Content';

// Context
export const WeatherCityList = createContext({});
export const WeatherLocation = createContext({});
export const WeatherLocationNotification = createContext({});
export const WeatherContent = createContext({});

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
    <WeatherCityList.Provider
      value={{ cityActive, setCityActive, setCityId, setIsLocation }}
    >
      <WeatherLocation.Provider
        value={{
          setIsLocation,
          setIsLocationEnabled,
          setLocationErrorMessage,
          setIsLoading,
          setLocationCoordinates,
          setCityId,
          setCityActive,
        }}
      >
        <WeatherContent.Provider
          value={{
            cityWeather,
            cityWeatherWeather,
            cityWeatherMain,
            cityWeatherClouds,
            cityWeatherSys,
            cityWeatherWind,
          }}
        >
          <WeatherLocationNotification.Provider
            value={{
              isLocationEnabled,
              locationCoordinates,
              locationErrorMessage,
              cityWeather,
            }}
          >
            <Box sx={{ py: 2 }}>
              <Grid className="weather" container spacing={4}>
                <Grid item xs={12} md={6} lg={3}>
                  {/*** Render city list ***/}
                  <CityList />

                  {/*** Add 'My location' button ***/}
                  <LocationButton />
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
                      boxShadow: '0px 2px 5px 0px #d2d2d2;',
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
                        {/*** Main weather content ***/}
                        <Content />

                        {/*** Location notification ***/}
                        {!isLocation ? '' : <LocationNotification />}
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </WeatherLocationNotification.Provider>
        </WeatherContent.Provider>
      </WeatherLocation.Provider>
    </WeatherCityList.Provider>
  );
};

export default Weather;
