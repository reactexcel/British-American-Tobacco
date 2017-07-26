import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import { CONFIG } from '../config/index.js';
import TmeLists from '../components/tme/lists';
import * as tmeActions from '../actions/tme/index';


class AllTmeContainer extends React.Component {
  constructor(props) {
	  super(props);
    this.goto =this.goto.bind(this)
  }

  componentWillReceiveProps(props) {
    const loggedIn = localStorage.getItem('bat-access-token');
    if (loggedIn == null || props.logData.tokenStatus === 'Expired') {
      this.props.router.push('/');
    }
  }

  goto(){
    this.props.router.push('/addtme')
  }

  handleTest(data) {
    this.props.router.push(data);
  }

  render() {
    return (
      <div>
        <TmeLists onTmeList={this.props.onTmeList} goto={this.goto} handleTest={this.handleTest} {...this.props} />
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
  onTmeList: (page, perPageLimit) => dispatch(tmeActions.tmeList(page, perPageLimit)),
});

const VisibleAllTmeContainer = connect(mapStateToProps, mapDispatchToProps)(AllTmeContainer);

const RouterVisibleAllTmeContainer = withRouter(VisibleAllTmeContainer);

export default RouterVisibleAllTmeContainer;
