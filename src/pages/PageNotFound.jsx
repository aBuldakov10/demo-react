import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <Typography variant="h3" component="h1" style={{ fontWeight: 600, textAlign: 'center' }}>
      {t('no-page')}
    </Typography>
  );
};

export default PageNotFound;
