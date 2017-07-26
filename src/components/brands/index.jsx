import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Box from '../layout/Box';
import Button from '../form/PrimaryButton';

export default class AddBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      bat_id: '',
      brandname: '',
      edit:false,
      errorMsg: ''
    };
    this.addbrand = this.addbrand.bind(this);
  }

  componentWillMount() {
    const brandId = this.props.params.id;
    if (brandId != undefined) {
      this.setState({
        id: brandId,edit:true
      });
      this.props.onGetBrandById(brandId);
    }
  }

  componentWillReceiveProps(props) {
    let brand = props.brands.brand;
    if (this.state.edit && !_.isEmpty(brand)) {
      this.setState({
        id: brand[0].id || '',
        bat_id: brand[0].bat_id || '',
        brandname: brand[0].brandname || '',
      });
    }
  }
  addbrand() {
    const brandData = {
      bat_id: this.state.bat_id,
      brandname: this.state.brandname,
    };

    if (!this.state.edit) {
      this.props.onAddBrand(brandData).then((msg) => {
        if(msg.error){
          this.setState({errorMsg:msg.error.message})
        }else{
          this.props.handleBack();

        }
      });
    } else {
      this.props.onUpdateBrand(brandData, this.state.id).then((msg) => {
        this.props.onGetBrandById(this.state.id);
        this.props.handleBack();
      });
    }
  }
  render() {
    return (
      <div className="main">
        <Header pageTitle={'ADD BRAND :'} {...this.props} />
        <SideMenu {...this.props} key="" />
        <BodyHead pageTitle={'ADD BRAND'} disableTitle />
        {this.props.brands.error ?
        <div style={{ minHeight: '55px',marginLeft:"24.8%" }}>
            <div className="alert alert-danger" role="alert" style={{ width: '100%', margin: 'auto' ,textAlign:"center"}}>
              <strong>{this.state.errorMsg}</strong>
            </div>
        </div>
        :
        null
        }
        <Box loader ={this.props.loader.show_loading}>
          <div className="col-6 "style={{ marginTop: '2%' }}>
            <div className="row">
              <div className="col-md-6 pull-left" style={{ marginTop: '2%', color: '#667685', marginLeft: '2%' }}>
                <label
                  className="col-md-3 p-0"
                  style={{
                    marginTop: '1%',
                    width: '100%',
                    fontSize: '16px',
                    marginBottom: '3%',
                    fontWeight: '500' }}
                >
                    Brand Name (Name)
                  </label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    width: '86%',
                    height: '42px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D0D0D0',
                    borderRadius: '5px',
                    marginLeft: '2%',
                  }}
                  onChange={(e) => {
                    this.setState({
                      brandname: e.target.value,
                    });
                  }}
                  value={this.state.brandname}
                />

              </div>
            </div>
          </div>

          <div
            className="col-6"
            style={{
              marginTop: '0%',
              color: '#667685',
              marginLeft: '2%',
            }}
          >
            <div className="row">
              <label
                className="col-md-6 p-0"
                style={{
                  marginTop: '3%',
                  width: '100%',
                  fontSize: '16px',
                  marginLeft: '2%',
                  marginBottom: '1%',
                  fontWeight: '500',
                }}
              >BAT ID (As per your sales data)</label>
              <input
                disabled ={this.state.edit}
                type="text"
                className="form-control"
                style={{
                  width: '41%',
                  height: '42px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D0D0',
                  borderRadius: '5px',
                  marginLeft: '3%',
                }}
                onChange={(e) => {
                  this.setState({
                    bat_id: e.target.value,
                  });
                }}
                value={this.state.bat_id}
              />
            </div>
          </div>
          <div className="col-md-6 pull-right" style={{ marginTop: '15%', marginLeft: '20%' }}>
            <div className="form-group" style={{ marginLeft: '23%' }}>
              <Button onClick={() => this.props.handleBack()}>CANCEL</Button>
              <Button
                loader={this.props.loader.show_loading}
                buttonType="primary"
                onClick={() => this.addbrand()}
              >ADD/SAVE</Button>
            </div>
          </div>

        </Box>
      </div>
    );
  }
}
