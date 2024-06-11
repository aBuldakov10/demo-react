import React, { useRef, useLayoutEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Components
import HeadPage from '../components/HeadPage';
import Timer from '../components/Timer/Timer';
import MainSlider from '../components/MainSlider/MainSlider';

// Hooks
import useMedia from '../hooks/useMedia';

const Home = () => {
  const h2ref = useRef(null);
  const { t } = useTranslation();

  // Page head meta data
  const pageHeadData = {
    title: t('home.page.title'),
    description: t('home.page.description'),
    keywords: t('home.page.keywords'),
    bodyAttributes: { class: 'main-page' },
  };

  // при загрузке страницы фокус на элементе h2ref не зависимо от количества контента
  // не корректно работает при SPA
  // useLayoutEffect срабатывает раньше, чем useEffect
  useLayoutEffect(() => {
    h2ref.current.scrollIntoView();
  }, []);

  const small = useMedia('(max-width: 767px)');
  const large = useMedia('(min-width: 992px)');
  const medium = !small && !large;

  return (
    <Box sx={{ py: 2 }} ref={h2ref}>
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Typography variant="h6" component="p" align={'center'} style={{ fontWeight: 600 }}>
        {small && t('home.device.mob')}
        {medium && t('home.device.tab')}
        {large && t('home.device.desk')}
      </Typography>

      {/*** Timer ***/}
      <Timer />

      {/*** Slider ***/}
      <MainSlider />
    </Box>
  );
};

export default Home;
