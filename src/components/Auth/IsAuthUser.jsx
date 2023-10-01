import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';

// Firebase
import { app } from '../../constants/firebase';
import { getAuth, signOut } from 'firebase/auth';

// Store
import { logoutUser } from '../../store/auth/action';

const IsAuthUser = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();

    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
        localStorage.removeItem('user_state');
      })
      .catch((error) => {});
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="user-profile-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorElUser(event.currentTarget)}
        color="inherit"
      >
        <Avatar sx={{ backgroundColor: '#eee', color: '#432874' }}>B</Avatar>
      </IconButton>

      <Menu
        id="user-profile-menu"
        sx={{ mt: '55px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Link to="/profile">Profile</Link>
        </MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default IsAuthUser;
