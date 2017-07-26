import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { CONFIG } from '../config/index.js';
import AllSku from '../components/skus/list';
import * as skuActions from '../actions/allsku/index';


class SkuContainer extends React.Component {
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
        <AllSku allSkuList={this.props.onSkuList} sku={this.props.skuList} handleTest={this.handleTest} brandName={this.props.brandName} {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const skuList = state.skuList.toJS();
  return {
    loader: state.loader.toJS(),
    skuList: skuList.skuList,
    test: skuList,
    brandName: skuList.brandName,
    logData: state.login.toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  onSkuList: (page, perPageLimit) => dispatch(skuActions.skuList(page, perPageLimit)),
});

const VisibleSkuContainer = connect(mapStateToProps, mapDispatchToProps)(SkuContainer);

const RouterVisibleSkuContainer = withRouter(VisibleSkuContainer);

export default RouterVisibleSkuContainer;
