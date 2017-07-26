import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import * as actions from '../actions/outlets/index';
import { CONFIG } from '../config/index';
import Outlets from '../components/outlets/list';

class OutletContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleTest = this.handleTest.bind(this);
  }

  componentWillReceiveProps(props) {
    const loggedIn = localStorage.getItem('bat-access-token');
    if (loggedIn == null || props.logData.tokenStatus === 'Expired') {
      this.props.router.push('/');
    }
  }

  handleTest(data) {
    this.props.router.push(data);
  }

  render() {
    return (
      <div>
        <Outlets handleTest={this.handleTest} {...this.props} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    loader: state.loader.toJS(),
    logData: state.login.toJS(),
    outletList: state.outlets.toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  onOutletList: (pageNo, itemPerPage) => dispatch(actions.outletList(pageNo, itemPerPage)),

});

const VisibleOutletContainer = connect(mapStateToProps, mapDispatchToProps)(OutletContainer);

const RouterVisibleOutletContainer = withRouter(VisibleOutletContainer);

export default RouterVisibleOutletContainer;
