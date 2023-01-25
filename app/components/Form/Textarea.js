import React from 'react';

import { Box, TextField, Typography } from '@mui/material';

const Textarea = ({
  id,
  placeholder,
  label,
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
}) => {
  const errorMessage = errors[name];
  const isTouched = touched[name];
  const isError = errorMessage && isTouched;

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      <TextField
        id={id}
        name={name}
        label={label}
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        error={isError}
      />

      {isError && (
        <Typography
          className="input-error-message"
          sx={{
            position: 'absolute',
            bottom: -20,
            fontSize: 12,
            color: '#d32f2f',
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Textarea;
