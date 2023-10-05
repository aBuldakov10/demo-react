import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, AlertTitle, Box, Divider } from '@mui/material';

// Files
import { cityWeatherSelector, locationDataSelector } from '../../store/weather/selectors';

const LocationNotification = () => {
  const { name } = useSelector(cityWeatherSelector);
  const { coordinates, errorMessage, enabledInBrowser } = useSelector(locationDataSelector);

  return (
    <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>
      <Divider sx={{ my: 3, borderColor: 'inherit' }} />

      {enabledInBrowser ? (
        <Alert severity="info" variant="outlined" sx={{ backgroundColor: '#fff' }}>
          <AlertTitle>Notification</AlertTitle>
          Your location is: latitude <strong>{coordinates.lat}</strong> and longitude <strong>{coordinates.lon}</strong>
          . The nearest weather data location is <strong>{name}</strong>.
        </Alert>
      ) : (
        <Alert severity="warning" variant="outlined" sx={{ backgroundColor: '#fff' }}>
          <AlertTitle>{errorMessage}</AlertTitle>
          You should to enable geolocation in your browser to see your weather location data
        </Alert>
      )}
    </Box>
  );
};

export default LocationNotification;
