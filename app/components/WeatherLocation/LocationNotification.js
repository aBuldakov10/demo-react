import React, { useContext } from 'react';
import { Alert, AlertTitle, Box, Divider } from '@mui/material';

import { WeatherLocationNotification } from '../../pages/Weather/Weather'; // Import context

const LocationNotification = () => {
  const {
    isLocationEnabled,
    locationCoordinates,
    locationErrorMessage,
    cityWeather,
  } = useContext(WeatherLocationNotification);

  return (
    <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>
      <Divider sx={{ my: 3, borderColor: 'inherit' }} />

      {isLocationEnabled ? (
        <Alert
          severity="info"
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        >
          <AlertTitle>Notification</AlertTitle>
          Your location is: latitude <strong>
            {locationCoordinates.lat}
          </strong>{' '}
          and longitude <strong>{locationCoordinates.lon}</strong>. The nearest
          weather data location is <strong>{cityWeather.name}</strong>.
        </Alert>
      ) : (
        <Alert
          severity="warning"
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        >
          <AlertTitle>{locationErrorMessage}</AlertTitle>
          You should to enable geolocation in your browser to see your weather
          location data
        </Alert>
      )}
    </Box>
  );
};

export default LocationNotification;
