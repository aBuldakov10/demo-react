import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

// Files
import './Weather.scss';
import imgBg from './weather-bg.jpg';
import { fetchWeather } from './api';

// Store
import { getWeatherCity, weatherLoaded } from '../../store/weather/actions';
import { activeCitySelector, locationDataSelector, weatherLoader } from '../../store/weather/selectors';

// Components
import Loader from '../../components/Loader/Loader';
import CityList from '../../components/Weather/CityList/CityList';
import LocationButton from '../../components/WeatherLocation/LocationButton';
import LocationNotification from '../../components/WeatherLocation/LocationNotification';
import Content from '../../components/Weather/Content/Content';
import YaMap from '../../components/YaMap/YaMap';

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
          <Box className="weather-content-wrapper" sx={{ backgroundImage: `url(${imgBg})` }}>
            {loader ? (
              <Loader />
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

        <Grid item xs={12}>
          <div className="map-wrapper">
            <YaMap />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weather;
