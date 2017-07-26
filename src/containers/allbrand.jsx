import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import { CONFIG } from '../config/index.js';
import AllBrands from '../components/brands/list';
import * as brandActions from '../actions/brands/index';


class AllBrandContainer extends React.Component {
  constructor(props) {
	  super(props);
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
        <AllBrands allBrandList={this.props.onBrandList} handleTest={this.handleTest} {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader.toJS(),
    logData: state.login.toJS(),
    brands: state.brands.toJS(),
  };
}


const mapDispatchToProps = dispatch => ({
  onBrandList: (page, perPageLimit) => dispatch(brandActions.brandList(page, perPageLimit)),
});

const VisibleAllBrandContainer = connect(mapStateToProps, mapDispatchToProps)(AllBrandContainer);

const RouterVisibleAllBrandContainer = withRouter(VisibleAllBrandContainer);

export default RouterVisibleAllBrandContainer;
