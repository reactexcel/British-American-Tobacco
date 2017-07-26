import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import { CONFIG } from '../config/index.js';
import AddBrand from '../components/brands';
import * as brandActions from '../actions/brands/index';


class AddBrandContainer extends React.Component {
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
    this.props.router.push('/allbrand')
  }

  render() {
    return (
      <div>
        <AddBrand handleBack ={this.handleBack}  {...this.props} />
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
  onGetBrandById: brandId => dispatch(brandActions.getBrandById(brandId)),
  onAddBrand: brandData => dispatch(brandActions.addBrand(brandData)),
  onUpdateBrand: (brandData, brandId) => dispatch(brandActions.updateBrand(brandData, brandId)),
});

const VisibleAddBrandContainer = connect(mapStateToProps, mapDispatchToProps)(AddBrandContainer);

const RouterVisibleAddBrandContainer = withRouter(VisibleAddBrandContainer);

export default RouterVisibleAddBrandContainer;
