import React from 'react';
import Login from '../components/login/index';
import * as _ from 'lodash';
import * as actions from '../actions/login/index';
import { CONFIG } from '../config/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
  }
  componentWillMount() {
    this.loggedIn();
  }
  componentWillReceiveProps(props) {
    this.loggedIn();
  }
  loggedIn() {
    const loggedIn = localStorage.getItem('bat-access-token');
    if (loggedIn !== null && this.props.logData.tokenStatus !== 'Expired') {
      this.props.router.push('/addsku');
    }
  }
  onBack() {
    this.props.router.push('/');
  }

  render() {
    return (
      <div>
        <Login signIn={this.props.onLogin} {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader.toJS(),
    logData: state.login.toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(actions.login(username, password)),
});

const VisibleLoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

const RouterVisibleLoginContainer = withRouter(VisibleLoginContainer);

export default RouterVisibleLoginContainer;
