import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import { CONFIG } from '../config/index';
import TmeDetails from '../components/tme/tmedetails';
import * as tmeActions from '../actions/tme/index';

class AddTmeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillReceiveProps(props) {
    const loggedIn = localStorage.getItem('bat-access-token');
    if (loggedIn == null || props.logData.tokenStatus === 'Expired') {
      this.props.router.push('/');
    }
  }
  handleBack(){
    this.props.router.push('/tmeList');
  }

  render() {
    return (
      <div>
        <TmeDetails handleBack={this.handleBack} {...this.props}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    loader: state.loader.toJS(),
    logData: state.login.toJS(),
    tmeList: state.tmeList.toJS()
  };
}

const mapDispatchToProps = dispatch => ({
  onAddTme: (tmeData) => {
    return dispatch(tmeActions.addtme(tmeData));
  },
  onUpdateTme: (tmeData, tmeId) => {
    return dispatch(tmeActions.updatetme(tmeData, tmeId));
  },
  onGetTme: (tmeId) => {
    return dispatch(tmeActions.getTmeById(tmeId));
  },
  onSearchByKey: (key,filter) => {
    return dispatch(tmeActions.getDataOnSearch(key,filter));
  },
  onTmeOutletList: (id) => {
    return dispatch(tmeActions.getTmeOutletList(id));
  },
  onUnassign: (id) => {
    return dispatch(tmeActions.onUnassign(id));
  },
  onAssign: (tmeId,outletIDs) => {
    return dispatch(tmeActions.onAssign(tmeId,outletIDs));
  },
  onChangePassword: (id,username,newPass) => {
    return dispatch(tmeActions.onChangePassword(id,username,newPass));
  }

});

const VisibleAddTmeContainer = connect(mapStateToProps, mapDispatchToProps)(AddTmeContainer);

const RouterVisibleAddTmeContainer = withRouter(VisibleAddTmeContainer);

export default RouterVisibleAddTmeContainer;
