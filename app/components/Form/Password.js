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
      <IconButton
        style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)' }}
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>

      {(isRequiredOnSubmit || isError) && (
        <Typography
          className="input-error-message"
          sx={{ position: 'absolute', bottom: -20, fontSize: 12, color: '#d32f2f' }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Password;
