import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '',
  },
  palette: {
    custom: {
      main: '#432874',
      dark: '#2c1a4d',
      contrastText: '#fff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2c1a4d',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#432874',
            },
          },
          '& label.Mui-focused': {
            color: '#432874',
          },
        },
      },
    },
  },
});
