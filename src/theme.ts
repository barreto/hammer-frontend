import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: "#212121",
    },
    secondary: {
      // main: "#19857b",
      main: "#6D34B6",
    },
    error: {
      main: "#BB3124",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
