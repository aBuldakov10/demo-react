import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, AlertTitle, Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import { cityWeatherSelector, locationDataSelector } from '../../../store/weather/selectors';

const LocationNotification = () => {
  const { t } = useTranslation();
  const { name } = useSelector(cityWeatherSelector);
  const { coordinates, errorMessage, enabledInBrowser } = useSelector(locationDataSelector);

  return (
    <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>
      <Divider sx={{ my: 3, borderColor: 'inherit' }} />

      {enabledInBrowser ? (
        <Alert severity="info" variant="outlined" sx={{ backgroundColor: '#fff' }}>
          <AlertTitle>{t('weather.location.title-enabled')}</AlertTitle>
          {t('weather.location.enabled-msg-start')} {t('weather.location.lat')} <strong>{coordinates.lat}</strong>{' '}
          {t('weather.location.lon')} <strong>{coordinates.lon}</strong>. {t('weather.location.enabled-msg-end')}{' '}
          <strong>{name}</strong>.
        </Alert>
      ) : (
        <Alert severity="warning" variant="outlined" sx={{ backgroundColor: '#fff' }}>
          <AlertTitle>{t('weather.location.title-disabled')}</AlertTitle>
          {t('weather.location.disabled-msg')}
        </Alert>
      )}
    </Box>
  );
};

export default LocationNotification;
