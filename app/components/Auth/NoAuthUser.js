import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Store
import { noAuthError } from '../../store/auth/action';
import { authErrorSelector } from '../../store/auth/selectors';

const NoAuthUser = () => {
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseAuthMenu = () => setAnchorEl(null);
  const handleNoAuthError = () => isAuthError && dispatch(noAuthError());

  return (
    <>
      <IconButton
        size="large"
        aria-label="auth menu"
        aria-controls="auth-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        color="inherit"
      >
        <AccountCircle sx={{ width: '40px', height: '40px' }} />
      </IconButton>

      <Menu
        id="auth-menu"
        sx={{ mt: '55px' }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
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
