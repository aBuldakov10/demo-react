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
    delete: {
      main: '#c71919',
      dark: '#a61818',
      contrastText: '#fff',
    },
    done: {
      main: '#b6b6b6',
      dark: '#44d605',
      contrastText: '#fff',
    },
    isDone: {
      main: '#44d605',
      dark: '#3bbb05',
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
