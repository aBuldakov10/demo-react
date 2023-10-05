import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

// Files
import './WeatherLocation.scss';
import { chooseMyCity } from './index';

// Store
import { disabledLocation, getWeatherLocation, weatherLoaded, weatherLoading } from '../../store/weather/actions';

const LocationButton = () => {
  const dispatch = useDispatch();

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
        const locationData = await chooseMyCity();

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
      My location
    </Button>
  );
};

export default LocationButton;
