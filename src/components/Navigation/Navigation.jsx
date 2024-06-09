import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import useMedia from '../../hooks/useMedia';

const Navigation = ({ nav }) => {
  const { lng } = useParams();
  const mob = useMedia('(max-width: 767px)');

  const [menu, setMenu] = useState(null);

  /*** Handlers ***/
  const handleCloseMenu = () => setMenu(null);

  return (
    <nav className="nav-menu" role="navigation">
      {mob ? (
        <>
          <IconButton
            aria-label="change menu"
            aria-controls="change-menu"
            aria-haspopup="true"
            sx={{ color: 'inherit', px: 0 }}
            onClick={(event) => setMenu(event.currentTarget)}
          >
            <MenuIcon fontSize={'large'} />
          </IconButton>

          <Menu id="menu" anchorEl={menu} keepMounted open={!!menu} onClose={handleCloseMenu}>
            {nav.map(({ title, link }) => {
              return (
                <MenuItem className="nav-menu__list-item" key={link}>
                  <Link to={`/${lng}${link}`} className="nav-menu__link" onClick={handleCloseMenu}>
                    {title}
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </>
      ) : (
        <ul className="nav-menu__list">
          {nav.map(({ title, link }) => {
            return (
              <li className="nav-menu__list-item" key={link}>
                <Link to={`/${lng}${link}`} className="nav-menu__link">
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

// Array of object props
Navigation.propTypes = {
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default Navigation;
