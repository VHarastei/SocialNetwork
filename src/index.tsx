import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0073FF'
      //main: '#fff'
    },
    secondary: {
      main: '#f3673b'
      //main: '#fff'
    },
    
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        color: 'red',
      },
    },
  },
  //'&:hover': { background: '#ff3300' },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
