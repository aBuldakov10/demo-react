import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import i18n from '../../constants/i18n';
import { useTranslation } from 'react-i18next';

const LangSwitcher = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [anchorElLang, setAnchorElLang] = useState(null);

  /*** Handlers ***/
  const handleCloseLangMenu = () => setAnchorElLang(null);

  const handleChangeLang = (language) => {
    const path = window.location.hash.split('/');

    // Change lang in path
    path[1] = language;
    path.splice(0, 1);

    navigate(`/${path.join('/')}`); // navigate to new path with changed lang

    sessionStorage.setItem('lang', language);
    i18n.changeLanguage(language);
    handleCloseLangMenu();
  };

  return (
    <>
      <IconButton
        className="language-icon"
        aria-label="change lang menu"
        aria-controls="change-lang-menu"
        aria-haspopup="true"
        sx={{ color: 'inherit' }}
        onClick={(event) => setAnchorElLang(event.currentTarget)}
      >
        <Language fontSize={'large'} />
      </IconButton>

      <Menu id="language-menu" anchorEl={anchorElLang} keepMounted open={!!anchorElLang} onClose={handleCloseLangMenu}>
        <MenuItem onClick={() => handleChangeLang('ru')}>{t('lang-switcher.ru')}</MenuItem>
        <MenuItem onClick={() => handleChangeLang('en')}>{t('lang-switcher.en')}</MenuItem>
      </Menu>
    </>
  );
};

export default LangSwitcher;
