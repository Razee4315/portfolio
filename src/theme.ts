import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E', // Deep Navy Blue
    },
    secondary: {
      main: '#7B1FA2', // Rich Burgundy
    },
    background: {
      default: '#F8F1E5', // Elegant Cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333', // Charcoal Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
