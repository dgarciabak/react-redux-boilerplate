import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import { store, history } from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#BA0C2F',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
, document.getElementById('root'));

// registerServiceWorker();
