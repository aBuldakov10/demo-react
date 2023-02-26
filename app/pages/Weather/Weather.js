import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, CircularProgress } from '@mui/material';

// Files
import './Weather.scss';
import imgBg from './weather-bg.jpg';
import { fetchWeather } from './api';

// Store
import { getWeatherCity, weatherLoaded } from '../../store/weather/actions';
import {
  activeCitySelector,
  locationDataSelector,
  weatherLoader,
} from '../../store/weather/selectors';

// Components
import CityList from '../../components/Weather/CityList';
import LocationButton from '../../components/WeatherLocation/LocationButton';
import LocationNotification from '../../components/WeatherLocation/LocationNotification';
import Content from '../../components/Weather/Content';

const Weather = () => {
  const dispatch = useDispatch();
  const loader = useSelector(weatherLoader);
  const { activeCityId } = useSelector(activeCitySelector);
  const { isLocation } = useSelector(locationDataSelector);

  useEffect(() => {
    fetchWeather(activeCityId).then((cityWeather) => {
      dispatch(getWeatherCity(cityWeather));
      dispatch(weatherLoaded());
    });
  }, [activeCityId]);

  return (
    <Box sx={{ py: 2 }}>
      <Grid className="weather" container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
          {/*** Render city list ***/}
          <CityList />

          {/*** Add 'My location' button ***/}
          <LocationButton />
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
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
            {loader ? (
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
                {isLocation && <LocationNotification />}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weather;
