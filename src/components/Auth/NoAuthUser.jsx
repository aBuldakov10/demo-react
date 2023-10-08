import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Files
import './Auth.scss';

// Store
import { noAuthError } from '../../store/auth/action';
import { authErrorSelector } from '../../store/auth/selectors';

const NoAuthUser = () => {
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);

  const [anchorEl, setAnchorEl] = useState(null);

  /*** Handlers ***/
  const handleCloseAuthMenu = () => setAnchorEl(null);
  const handleNoAuthError = () => isAuthError && dispatch(noAuthError());

  return (
    <>
      <IconButton
        className="user-icon"
        aria-label="auth menu"
        aria-controls="auth-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        open={!!anchorEl}
        onClose={handleCloseAuthMenu}
      >
        <MenuItem onClick={handleCloseAuthMenu}>
          <Link to="/login" onClick={handleNoAuthError}>
            Login
          </Link>
        </MenuItem>

        <MenuItem onClick={handleCloseAuthMenu}>
          <Link to="/registration" onClick={handleNoAuthError}>
            Registration
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NoAuthUser;
