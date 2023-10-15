import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

// Files
import './Form.scss';

const Text = ({
  id,
  className,
  placeholder,
  label,
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
}) => {
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
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        fullWidth
        error={isError}
      />

      {(isRequiredOnSubmit || isError) && (
        <Typography color="error" className="input-error-message">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Text;
