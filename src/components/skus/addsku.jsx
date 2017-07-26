import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Button from '../form/PrimaryButton.jsx';


export default class AddSku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      id: 0,
      productname: '',
      bat_id: '',
      brand_id: 0,
      basepoint: '',
      skumax: false,
      alert: false,
      msg: '',
      disabled: false,
      errMsg: '',
    };
    this.addSku = this.addSku.bind(this);
  }
  componentWillMount() {
    const skuId = this.props.params.id;
    if (skuId != undefined) {
      this.setState({
        id: skuId, disabled: true,
      });
      this.props.onGetSkuById(skuId);
    }
  }
  componentWillReceiveProps(props) {
    let sku = props.skuList.sku;
    if (this.state.disabled && !_.isEmpty(sku)) {
      sku = sku.brand;
      this.setState({
        id: sku.id,
        productname: sku.productname || '',
        bat_id: sku.bat_id || '',
        brand_id: sku.brand_id || '',
        basepoint: sku.basepoint || '',
        skumax: sku.skumax,
      });
    }
  }
  addSku(evt) {
    const skuData = {
      productname: this.state.productname,
      bat_id: this.state.bat_id,
      brand_id: this.state.brand_id,
      basepoint: this.state.basepoint,
      skumax: this.state.skumax.toString(),
    };
    const skuId = this.state.id;
    if (!this.state.disabled) {
      this.props.addingSku(skuData).then((val) => {
        if (val.error) {
          this.setState({ errMsg: val.error.message });
        } else if (val && (val.bat_id != '') && (val.brand_id != '') && (val.productname != '')) {
          this.props.handleBack();
        }
      });
    } else {
      this.props.onUpdateSku(skuData, skuId).then((msg) => {
        this.props.onGetSkuById(skuId);
        this.props.handleBack();
        this.setState({ msg, alert: true });
      });
    }
  }
  // openDatePick() {
  //   this.refs.dp.openDialog();
  // }
  render() {
    const dropDownData = this.props.brands && this.props.brands.viewbrands && this.props.brands.viewbrands.length > 0 &&
    this.props.brands.viewbrands.map((val, i) => <option key={i} value={val.brand.id}>{val.brand.brandname}</option>);
    return (
      <div className="main">
        <Header pageTitle={'ADD SKU :'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'ADD SKU'} disableTitle />
        {this.props.skuList.err ?
          <div style={{ minHeight: '55px', marginLeft: '24.8%' }}>
            <div
              className="alert alert-danger" role="alert"
              style={{ width: '100%', margin: 'auto', textAlign: 'center' }}
            >
              <strong>{this.state.errMsg}</strong>
            </div>
          </div>
        :
        null
        }
        <Box>
          <div className="container-fluid" style={{ marginTop: '4%' }}>
            <div className="row" >
              <div className="col-xs-6 col-md-6">
                <div className="col-xs-5">
                  <label
                    style={{
                      marginTop: '4%',
                      width: '100%',
                      fontSize: '16px',
                      color: '#667685',
                      fontWeight: '500' }}
                  >Brand Name   :
                </label>
                </div>
                <div className="col-xs-3 col-md-7">
                  <select
                    id="sel1" value={this.state.brand_id} className="form-control" onChange={(e) => {
                      this.setState({ brand_id: e.target.value });
                    }} style={{ width: '95%', backgroundColor: '#f4f4f4' }}
                  >
                    <option value="">Select Brand</option>
                    {dropDownData}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-offset-4">
                  <label
                    style={{
                      fontWeight: '500',
                      fontSize: '16px',
                      marginLeft: '2%',
                      color: '#667685',
                    }}
                  >From Date
                  </label>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-xs-6 col-md-6">
              <label
                className="col-md-3 p-0"
                style={{
                  marginBottom: '3%',
                  width: '100%',
                  marginTop: '4%',
                  marginLeft: '3%',
                  color: '#667685',
                  fontSize: '16px',
                  fontWeight: '500' }}
              > Product Name (Name)
                  </label>
              <input
                onChange={(e) => {
                  this.setState({ productname: e.target.value });
                }} type="text" className="form-control" value={this.state.productname}
                style={{
                  height: '42px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '5px',
                  marginLeft: '6%' }}
              />
            </div>

            <div className="col-xs-6 col-md-3" >
              <div className="input-group date" id="datetimepicker6">
                <input data-format="hh:mm" type="date" className="form-control" placeholder="DD-MM-YYYY" />
                <span className="input-group-addon">
                  <span
                    className="glyphicon glyphicon-calendar" onClick={this.openDatePicker}
                    style={{ color: '#1F8AFD' }}
                  />
                </span>
              </div>
            </div>

            <div className="col-xs-6 col-md-3" >
              <div className="input-group date input-append" id="datetimepicker3">
                <input data-format="hh:mm" type="text" className="form-control" placeholder="hh:mm" />
                <span className="input-group-addon">
                  <span style={{ color: '#1F8AFD' }}>AM</span>
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6 col-md-6" style={{ marginTop: '4%' }}>
              <label
                className="col-md-3 p-0"
                style={{
                  marginBottom: '3%',
                  marginLeft: '3%',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >  BAT ID ( as per your sales data)</label>
              <input
                disabled={this.state.disabled}
                onChange={(e) => {
                  this.setState({ bat_id: e.target.value });
                }} type="text" className="form-control" value={this.state.bat_id}
                style={{
                  height: '42px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '5px',
                  marginLeft: '6%' }}
              />
            </div>
            <div className="col-xs-6 col-md-6" >
              <p
                className="outlet" style={{ marginTop: '-5%',
                  marginLeft: '4%',
                  fontSize: '12px',
                  marginLeft: '4%',
                }}
              >Outlets will be awarded points for purchasing the product from
                 the date mentioned above.
                </p>
            </div>

            <div className="col-xs-6 col-md-6" style={{ marginTop: '2%' }} >
              <label
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              > Base Points (awarded without any promotions)
              </label>
              <h5
                style={{
                  marginTop: '3%',
                  marginLeft: '5%',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >1 Carton = </h5>
              <input
                onChange={(e) => {
                  this.setState({ basepoint: e.target.value });
                }}
                type="text"
                value={this.state.basepoint}
                className="form-control p-0"
                style={{
                  width: '73%',
                  height: '42px',
                  marginLeft: '25%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '5px',
                  marginTop: '-8%' }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 col-md-6"style={{ marginTop: '2%' }}>
              <label
                className="col-md-3 p-0"
                style={{
                  marginTop: '2%',
                  width: '100%',
                  marginLeft: '3%',
                  color: '#667685',
                  fontSize: '16px',
                  fontWeight: '500' }}
              >Is SKU part of MAX Rewards </label>
            </div>
            <div className="col-xs-6 col-md-8">
              <RadioButtonGroup
                name="skumax"
                style={styles.radio}
                defaultSelected="false"
                onChange={(e) => {
                  this.setState({ skumax: e.target.value });
                }}
                valueSelected={this.state.skumax ? 'true' : 'false'}
              >
                <RadioButton
                  value="true"
                  label="Yes"
                  style={{ width: '8%', paddingLeft: '10px' }}
                />
                <RadioButton
                  value="false"
                  label="No"
                  style={{ width: '2%', paddingLeft: '25px' }}
                />
              </RadioButtonGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-8" style={{ marginTop: '8%' }}>
              <Button onClick={() => this.props.handleBack()}>CANCEL</Button>
              <Button
                loader={this.props.loader.show_loading}
                buttonType="primary"
                onClick={() => this.addSku()}
              >ADD/SAVE</Button>
            </div>
          </div>
        </Box>
      </div>

    );
  }
}


const styles = {
  block: {
    maxWidth: 200,
  },
  radio: {
    marginLeft: '2%',
    opacity: '0.7',
    display: 'flex',
    flexDirection: 'left',
    position: 'relative',
  },
};
