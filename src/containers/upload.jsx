import React from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import * as _ from 'lodash';
import { CONFIG } from '../config/index.js';
import UploadData from '../components/uploadData';
import * as reportActions from '../actions/report/index';

class UploadContainer extends React.Component {
  constructor(props) {
	  super(props);
  }

  componentWillReceiveProps(props) {
    const loggedIn = localStorage.getItem('bat-access-token');
    if (loggedIn == null || props.logData.tokenStatus === 'Expired') {
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <div>
        <UploadData {...this.props}  />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader.toJS(),
    logData: state.login.toJS(),
    allReports: state.report.toJS().allReports
  };
}


const mapDispatchToProps = dispatch => ({
  onGetUploadedReports: () => {
    return dispatch( reportActions.getUploadedReports() );
  },
  OnUploadReports: (  data ) => {
    let retData = dispatch( reportActions.uploadCsvReport(data) );
    // retData.then((res) => {
    //   if( res.newReportId ){
    //     let newReportId = res.newReportId;
    //     browserHistory.push(`uploadreport/${newReportId}#/uploadreport/${newReportId}`);
    //   }
    // }, (error) => {
      
    // })
    return retData;
  }
});

const VisibleUploadContainer = connect(mapStateToProps, mapDispatchToProps)(UploadContainer);

const RouterVisibleUploadContainer = withRouter(VisibleUploadContainer);

export default RouterVisibleUploadContainer;