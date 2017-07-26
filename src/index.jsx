import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import LoginContainer from './containers/login.jsx';
import OutletContainer from './containers/viewoutlet.jsx';
import SkuContainer from './containers/allskulist.jsx';
import AddSkuContainer from './containers/addsku.jsx';
import AllBrandContainer from './containers/allbrand.jsx';
import AddOutletContainer from './containers/addOutlet';
import EditOutletContainer from './containers/editOutlet';
import AddBrand from './containers/addBrand';
import UploadContainer from './containers/upload';
import UploadReportContainer from './containers/uploadreport';
import AddTmeContainer from './containers/tmeDetails';
import AllTmeContainer from './containers/allTme';
import MembershipContainer from './containers/membership.jsx';

import App from './app.jsx';
import './api.js';
import PerformanceHis from './components/outlets/performanceHis.jsx';
import Login from './components/login/index.jsx';
import CampaignDetails from './components/campaigns/campaigndetails.jsx';
import AddSku from './components/skus/addsku.jsx';
import AddingSku from './components/skus/promotionsDetails.jsx';
import AllCampaigns from './components/campaigns/campaigns.jsx';
import TmeLists from './components/tme/lists.jsx';
import TmeDetails from './components/tme/tmedetails.jsx';
import Outlets from './components/outlets/list.jsx';
import Promo from './components/promo.jsx';
import reducer from './reducers/index';
import RebateRequestsList from './containers/rebateRequestsList';

const muiTheme = getMuiTheme({
	fontFamily        : 'Roboto, sans-serif',
	selectedTextColor : '#1F8AFD',
	palette           : {
		primary1Color : '#1F8AFD',
	},
});

const store = createStore(reducer, {}, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
));
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRoute component={LoginContainer} />
          <Route path="addsku" component={AddSkuContainer} />
          <Route path="editsku/:id" component={AddSkuContainer} />
          <Route path="addbrand" component={AddBrand} />
          <Route path="addbrand/:id" component={AddBrand} />
          <Route path="allbrand" component={AllBrandContainer} />
          <Route path="addingsku" component={AddingSku} />
          <Route path="allskus" components={SkuContainer} />
          <Route path="allcampaigns" components={AllCampaigns} />
          <Route path="campaigndetails" component={CampaignDetails} />
          <Route path="membership" components={MembershipContainer} />
          <Route path="promotions" components={Promo} />
          <Route path="outlets" components={OutletContainer} />
          <Route path="upload" components={UploadContainer} />
          <Route path="tmeList" components={AllTmeContainer} />
          <Route path="addtme" components={AddTmeContainer} />
          <Route path="editTme/:id" components={AddTmeContainer} />
          <Route path="uploadreport/:id/:type" components={UploadReportContainer} />
          <Route path="addoutlet" components={AddOutletContainer} />
          <Route path="performancehis" components={PerformanceHis} />
          <Route path="outletdetails/:id" components={EditOutletContainer} />
          <Route path="rebatereq" components={RebateRequestsList} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>, document.querySelector('#app'));
