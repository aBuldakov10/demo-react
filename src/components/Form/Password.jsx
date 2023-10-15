import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Password = ({
  id,
  className,
  placeholder,
  label,
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = errors[name];
  const isTouched = touched[name];
  const isError = errorMessage && isTouched;
  const isRequiredOnSubmit = errorMessage && !isTouched;

  const togglePassIcon = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <TextField
        id={id}
        className={className || ''}
        name={name}
        value={value || ''}
        label={label}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        fullWidth
        error={isError}
      />
      <IconButton className="password-icon" aria-label="toggle password visibility" onClick={togglePassIcon}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>

      {(isRequiredOnSubmit || isError) && (
        <Typography className="input-error-message" color="error">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Password;
