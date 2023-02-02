import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

import { chooseMyCity } from './index';
import { WeatherLocation } from '../../pages/Weather/Weather'; // Import context

const LocationButton = () => {
  const {
    setIsLocation,
    setIsLocationEnabled,
    setLocationErrorMessage,
    setIsLoading,
    setLocationCoordinates,
    setCityId,
    setCityActive,
  } = useContext(WeatherLocation);

  return (
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
  );
};

export default LocationButton;
