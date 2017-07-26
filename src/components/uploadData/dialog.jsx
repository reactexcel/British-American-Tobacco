import React from 'react';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './upload.scss';
import { CONFIG } from '../../config/index.js';

export default class UploadDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_upload_type: 'D_R',
      show_Delivery: true,
      show_Return: true,
      statusMessage: '',

      toBeUploadDeliveryCSV: false,
      toBeUploadReturnCSV: false
    };
    this.handleDeliveryCsvChange = this.handleDeliveryCsvChange.bind(this);
    this.handleSalesCsvChange = this.handleSalesCsvChange.bind(this);
    this.radioChange = this.radioChange.bind(this);

    this.doCsvUpload = this.doCsvUpload.bind(this);
    this.isValidJson = this.isValidJson.bind( this );
    CONFIG.csvUplodErrors = [];
  }
  componentWillMount() {
    this.setState({
      statusMessage: '',
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      statusMessage: '',
    });
  }
  radioChange(e, value) {
    $("#delivery_csv").val('');
    $("#sales_csv").val('');
    if (value === 'D') {
      this.setState({
        show_Delivery: true,
        show_Return: false,

        selected_upload_type: 'D',
        statusMessage: '',
        toBeUploadDeliveryCSV: false,
        toBeUploadReturnCSV: false
      });
    } else if (value === 'R') {
      this.setState({
        show_Delivery: false,
        show_Return: true,

        selected_upload_type: 'R',
        statusMessage: '',
        toBeUploadDeliveryCSV: false,
        toBeUploadReturnCSV: false
      });
    } else if (value === 'D_R') {
      this.setState({
        show_Delivery: true,
        show_Return: true,

        selected_upload_type: 'D_R',
        statusMessage: '',
        toBeUploadDeliveryCSV: false,
        toBeUploadReturnCSV: false
      });
    }
  }

  isValidJson( data ){
    let V_transaction_value = false;
    let V_sku_id = false;

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if( key === 'Quantity' ){
          V_transaction_value = true;
        } else if( key === 'Gen.No.' ){
          V_sku_id = true;
        }
      }
    }
    if( V_transaction_value == true && V_sku_id == true  ){
      return true
    }else{
      return false;
    }
  }


  handleDeliveryCsvChange(e) {
    const componentThis = this;
    const componentProps = this.props;
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete(results) {
        if (results.data && results.data.length > 0) {
          if( componentThis.isValidJson( results.data[0] ) ){
            const csvData = results.data;
            const dataToSend = {
              type: 'DELIVERY',
              fileName: file.name,
              csvData,
            };
			componentThis.setState({
              toBeUploadDeliveryCSV: dataToSend
            })
          }else{
            componentThis.setState({
              statusMessage: 'Invalid file format',
            });
          }
        }else{
          componentThis.setState({
            statusMessage: 'Invalid file format',
          });
        }
      },
    });
  }

  handleSalesCsvChange(e) {
    const componentThis = this;
    const componentProps = this.props;
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete(results) {
        if (results.data && results.data.length > 0) {
          if( componentThis.isValidJson( results.data[0] ) ){
            const csvData = results.data;
            const dataToSend = {
              type: 'RETURN',
              fileName: file.name,
              csvData,
            };
            componentThis.setState({
              toBeUploadReturnCSV: dataToSend
            })
          }else{
            componentThis.setState({
              statusMessage: 'Invalid file format',
            });
          }
        }else{
          componentThis.setState({
            statusMessage: 'Invalid file format',
          });
        }
      },
    });
  }


  doCsvUpload(){
    const componentProps = this.props;
    let toBeUploadDeliveryCSV = this.state.toBeUploadDeliveryCSV;
    let toBeUploadReturnCSV = this.state.toBeUploadReturnCSV;
    if( toBeUploadDeliveryCSV == false && toBeUploadReturnCSV == false ){
      this.setState({
        statusMessage: 'Select a csv file first.',
      });
    }else{
      let dataForApi = false;
      if( this.state.selected_upload_type == 'D_R' ){
        dataForApi = {
          type: 'DELIVERY_RETURN',
          csv_data_delivery: toBeUploadDeliveryCSV,
          csv_data_return: toBeUploadReturnCSV
        };
      } else if( this.state.selected_upload_type == 'D' ){
        dataForApi = toBeUploadDeliveryCSV;
      } else if( this.state.selected_upload_type == 'R' ){
        dataForApi = toBeUploadReturnCSV;
      }

      const retData = componentProps.OnUploadReports(dataForApi);
      retData.then((res) => {
        if (res.failedCsvRows) {
          CONFIG.csvUplodErrors = res.failedCsvRows;
        }
        if (res.newReportId) {
          const newReportId = res.newReportId;
          const newType = res.type;
          const newURL = `uploadreport/${newReportId}/${newType}`;
          componentProps.router.push(newURL);
        }
      }, (error) => {

      });
    }

  }

  render() {

    console.log( this.state )

    const show_Delivery = this.state.show_Delivery;
    const show_Return = this.state.show_Return;

    let showErrorMessage = '';
    if (this.state.statusMessage.length != '') {
      showErrorMessage = <div className="alert alert-danger">{this.state.statusMessage}</div>;
    }

    return (
      <div className="main">
        <Dialog
          modal={false}
          style={style.dialog}
          open={this.props.open}
          autoDetectWindowHeight
          autoScrollBodyContent
        >

          <div className="body" >
            <div className="row m-0">
              <div className="col-xs-12">
                <div className="title" style={{ marginTop: '1%', marginLeft: '10%' }} >{'UPLOAD REPORT'}</div>
                <span>
                  {showErrorMessage}
                </span>
              </div>
            </div>

            <div style={{ height: '240px' }}>

              <div className="row" >
                <div className="col-xs-12" style={{ marginTop: '0px', display: `${this.state.show_Delivery ? '' : 'none'}` }}>
                  <h5>Import Delivery Report (csv only)</h5>
                  <input
                    className="well well-xs" type="file" id="delivery_csv"
                    onChange={ (evt) => this.handleDeliveryCsvChange(evt) }
                    onClick={ (evt) => {
                      this.setState({
                        statusMessage: '',
                      });
                    }}
                  />
                </div>
              </div>


              <div className="row" >
                <div className="col-xs-12" style={{ marginTop: '0px', display: `${this.state.show_Return ? '' : 'none'}` }}>
                  <h5>Import Return Report (csv only)</h5>
                  <input
                    className="well well-xs" type="file" id="sales_csv"
                    onChange={ (evt) => this.handleSalesCsvChange(evt) }
                    onClick={ (evt) => {
                      this.setState({
                        statusMessage: '',
                      });
                    }}
                  />
                </div>
              </div>

            </div>


            <div className="row" style={{ marginTop: '2px' }}>
              <RadioButtonGroup
                name="upload"
                className="radio-inline"
                style={{ display: 'flex', overflow: 'hidden', marginLeft: '-24px' }}

                onChange={ (evt, val) => this.radioChange(evt,val)}
                defaultSelected="D_R"
              >
                <RadioButton
                  className="radio-inline"
                  value="D_R"
                  style={{ width: '37%' }}

                  label="Delivery & Returns Report Only"
                  labelStyle={{ fontSize: '12px', marginLeft: '0px', fontWeight: '500' }}
                />
                <RadioButton
                  className="radio-inline"
                  value="D"
                  style={{ width: '37%' }}
                  label="Delivery Report Only"
                  labelStyle={{ fontSize: '12px', marginLeft: '0px', fontWeight: '500' }}
                />
                <RadioButton
                  className="radio-inline"
                  value="R"
                  style={{ width: '37%' }}
                  label="Returns Report Only"
                  labelStyle={{ fontSize: '12px', fontWeight: '500' }}
                />
              </RadioButtonGroup>
            </div>


            <div className="row" style={{ textAlign: 'center', marginTop:'30px' }}>
              <div className="col-xs-6">
                <button className="btn cancel" style={{margin:'0px'}} onClick={(event) => { this.props.handleCloseDialog(event); }}>CANCEL</button>
              </div>
              <div className="col-xs-6">
                <button className="btn cancel" style={{margin:'0px', 'background':'rgb(31, 138, 253)'}} onClick={(event) => { this.doCsvUpload(event); }}>Award Points</button>
              </div>
            </div>
          </div>

        </Dialog>
      </div>
    );
  }
}

const style = {
  radio: {
    opacity: '0.7',
    display: 'inline-flex',
    marginTop: '8%',
  },
  dialog: {
    overflow: 'visible',
  },
};
