import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Components
import HeadPage from '../components/HeadPage';

const PageNotFound = () => {
  const { t } = useTranslation();

  // Page head meta data
  const pageHeadData = {
    title: t('no-page.page.title'),
    description: t('no-page.page.description'),
    keywords: t('no-page.page.keywords'),
    bodyAttributes: { class: 'no-page' },
  };

  return (
    <Box>
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Typography variant="h3" component="h1" style={{ fontWeight: 600, textAlign: 'center' }}>
        {t('no-page.title')}
      </Typography>
    </Box>
  );
};

export default PageNotFound;
