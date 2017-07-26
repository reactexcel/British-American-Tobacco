import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import { CONFIG } from '../config/index';
import UploadReport from '../components/uploadData/uploadreport';
import * as reportActions from '../actions/report/index';

class UploadReportContainer extends React.Component {
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
        <UploadReport {...this.props} csvUplodErrors={CONFIG.csvUplodErrors} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader.toJS(),
    logData: state.login.toJS(),
    report: state.report.toJS().report
  };
}


const mapDispatchToProps = dispatch => ({
  onGetUploadReportById: (reportId, type ) => {
    return dispatch( reportActions.onGetReportById(reportId, type) );
  },
  doRollBack: ( reportId, type ) => {
    return dispatch( reportActions.doRollBack( reportId, type) );
  }
});

const VisibleUploadReportContainer = connect(mapStateToProps, mapDispatchToProps)(UploadReportContainer);

const RouterVisibleUploadReportContainer = withRouter(VisibleUploadReportContainer);

export default RouterVisibleUploadReportContainer;
