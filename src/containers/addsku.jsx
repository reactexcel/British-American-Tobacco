import React from 'react';
import { CONFIG } from '../config/index.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import * as skuActions from '../actions/allsku';
import * as brandActions from '../actions/brands/index';
import AddSku from '../components/skus/addsku';

class AddSkuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleTest = this.handleTest.bind(this);
  }

  componentWillMount(){
  this.props.onBrandList(1,40);
  }

  componentWillReceiveProps (props) {
		let loggedIn = localStorage.getItem('bat-access-token');
		if (loggedIn == null || props.logData.tokenStatus === "Expired"){
			this.props.router.push('/');
		}
	}

  handleTest(data){
    this.props.router.push(data);
  }

  handleBack(){
    this.props.router.push('/allskus');
  }

  render() {
    return (
      <div>
        <AddSku addingSku={this.props.onAddingSku} handleTest={this.handleTest} handleBack={this.handleBack} {...this.props} />
      </div>
    );
  }
}



function mapStateToProps(state) {
	return {
    loader: state.loader.toJS(),
    skuList: state.skuList.toJS(),
    logData: state.login.toJS(),
    brands: state.brands.toJS(),
  }
}

const mapDispatchToProps = dispatch => ({
  onAddingSku: (skuData) => {
    return dispatch(skuActions.addSku(skuData));
  },
  onBrandList: (page,perPageLimit) => dispatch(brandActions.brandList(page, perPageLimit)),

  onUpdateSku: (skuData, skuId) => {
    return dispatch(skuActions.updateSku(skuData, skuId));
  },
  onGetSkuById: (skuId) => {
    return dispatch(skuActions.getSkuById(skuId));
  }
});

const VisibleAddSkuContainer = connect(mapStateToProps, mapDispatchToProps)(AddSkuContainer);

const RouterVisibleAddSkuContainer= withRouter(VisibleAddSkuContainer);

export default RouterVisibleAddSkuContainer;
