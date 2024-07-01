import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import './Weather.scss';
import imgBg from './weather-bg.jpg';
import { fetchWeather } from './api';

// Store
import { getWeatherCity, weatherLoaded } from '../../store/weather/actions';
import { activeCitySelector, locationDataSelector, weatherLoader } from '../../store/weather/selectors';

// Components
import HeadPage from '../../components/HeadPage';
import Loader from '../../components/Loader/Loader';
import CityList from '../../components/Weather/CityList/CityList';
import LocationButton from '../../components/Weather/Location/LocationButton';
import LocationNotification from '../../components/Weather/Location/LocationNotification';
import CitySearch from '../../components/Weather/CitySearch/CitySearch';
import Content from '../../components/Weather/Content/Content';
import YaMap from '../../components/YaMap/YaMap';

const Weather = () => {
  const dispatch = useDispatch();
  const { lng } = useParams();
  const { t } = useTranslation();
  const loader = useSelector(weatherLoader);
  const { activeCityId } = useSelector(activeCitySelector);
  const { isLocation } = useSelector(locationDataSelector);

  // Page head meta data
  const pageHeadData = {
    title: t('weather.page.title'),
    description: t('weather.page.description'),
    keywords: t('weather.page.keywords'),
    bodyAttributes: { class: 'weather-page' },
  };

  useEffect(() => {
    fetchWeather(activeCityId, lng).then((cityWeather) => {
      dispatch(getWeatherCity(cityWeather));
      dispatch(weatherLoaded());
    });
  }, [activeCityId, lng]);

  return (
    <Box sx={{ py: 2 }}>
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Grid className="weather" container spacing={4}>
        <Grid item xs={12} md={4} lg={3} className="weather__aside">
          {/*** Render city list ***/}
          <CityList />

          {/*** Add 'My location' button ***/}
          <LocationButton />
        </Grid>

        <Grid item xs={12} md={8} lg={9} className="weather__main">
          {/*** Search city ***/}
          <CitySearch />

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
