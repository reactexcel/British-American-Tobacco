import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Portal from './mainpage.jsx';
import App from './app.jsx';
import Home from './containers/home.jsx';
injectTapEventPlugin();


ReactDOM.render(
   <MuiThemeProvider>
    <Router history={hashHistory}>
    <Route path='/' >
        <IndexRoute component={Portal}/>
        <Route path='home' component={Home}/>
    </Route>
</Router>
</MuiThemeProvider>,
document.querySelector("#app"));
