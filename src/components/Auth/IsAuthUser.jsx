import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const { lng } = useParams();

  const [anchorElUser, setAnchorElUser] = useState(null);

  /*** Handlers ***/
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
        className="user-icon"
        aria-label="account of current user"
        aria-controls="user-profile-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorElUser(event.currentTarget)}
      >
        <Avatar className="user-avatar">B</Avatar>
      </IconButton>

      <Menu
        id="user-profile-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        open={!!anchorElUser}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Link to={`/${lng}/profile`}>Profile</Link>
        </MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default IsAuthUser;
