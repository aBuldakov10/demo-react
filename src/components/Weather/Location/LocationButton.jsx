import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Files
import './Location.scss';
import { chooseMyCity } from './index';

// Store
import { disabledLocation, getWeatherLocation, weatherLoaded, weatherLoading } from '../../../store/weather/actions';

const LocationButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lng } = useParams();

  return (
    <Button
      variant="contained"
      color="custom"
      className="weather-location-btn"
      endIcon={<LocationOn />}
      onClick={async () => {
        dispatch(weatherLoading());

        // Get location error or location data if enabled
        // Return object with location data - id, coords, weather
        const locationData = await chooseMyCity(lng);

        // Disabled location
        if (locationData.enabledInBrowser === false) {
          const { errorMessage } = locationData;

          dispatch(disabledLocation(errorMessage));
          dispatch(weatherLoaded());

          return;
        }

        // Enabled location
        dispatch(getWeatherLocation(locationData));
        dispatch(weatherLoaded());
      }}
    >
      {t('weather.location.button')}
    </Button>
  );
};

export default LocationButton;
