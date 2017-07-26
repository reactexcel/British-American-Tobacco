import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import Header from '../generic/header/header';
import BodyHead from '../generic/bodyhead';
import SideMenu from '../generic/menu/menu';
import Button from '../form/PrimaryButton';
import Box from '../layout/Box';
import DialogBox from './dialog';
import Table from '../table/table';
import TmeRow from './row';

export default class TmeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: 0,
      bat_id: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      mobile_no: '',
      edit: false,
      errorMsg: '',
      outletList: [],
      err: false
    };
    this.addTme = this.addTme.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateMobNo = this.validateMobNo.bind(this);
  }

  componentWillMount() {
    const tmeId = this.props.params.id;
    if (tmeId) {
      this.setState({
        id: tmeId, edit: true,
      });
      this.props.onGetTme(tmeId);
      this.props.onTmeOutletList(tmeId);
    }
  }

  componentWillReceiveProps(props) {
    const tme = props.tmeList.tme;
    const outletList = props.tmeList.tmeOutletList.data;
    this.setState({err: props.tmeList.err});
    if (this.state.id && !_.isEmpty(tme)) {
      this.setState({
        id: tme.id || '',
        bat_id: tme.bat_id || '',
        password: tme.password || '',
        first_name: tme.first_name || '',
        last_name: tme.last_name || '',
        email: tme.email || '',
        mobile_no: tme.mobile_no || '',
        outletList: outletList || []
      });
    }
  }

  handleOpen() {
    this.props.onSearchByKey(this.state.searchKey, 'ALL');
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleAssign(arr) {
    if (arr.length > 0) {
      const arrToString = arr.toString();
      this.props.onAssign(this.props.params.id, arrToString).then((val) => {
        this.props.onTmeOutletList(this.props.params.id);
        this.setState({ open: false });
      });
    }
  }

  validateEmail(emailData) {
    const {bat_id, password, first_name, last_name, email} = this.state ;
    if(bat_id === '' || password === '' || first_name === '' || last_name === '' || email === ''){
      return true
    }else{
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(emailData);
    }
  }
  validateMobNo(mobile_no){
    const {bat_id, password, first_name, last_name, email} = this.state ;
    if(bat_id === '' || password === '' || first_name === '' || last_name === '' || email === ''){
      return true
    }else{
    var re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return re.test(mobile_no);
    }
  }

  addTme() {
      const tmeData = {
        id: this.state.id,
        bat_id: this.state.bat_id,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        mobile_no: this.state.mobile_no,
      };
      const tmeId = this.state.id;

    if(this.validateEmail(this.state.email)){
      if(this.validateMobNo(this.state.mobile_no)){
        if (!this.state.edit) {
          this.props.onAddTme(tmeData).then((msg) => {
            if (msg.error) {
              this.setState({ errorMsg: msg.error.message });
            } else if (msg.status) {
              this.props.handleBack();
            }
          });
        } else {
          this.props.onUpdateTme(tmeData, tmeId).then((msg) => {
            this.props.onGetTme(tmeId);
            this.props.handleBack();
          });
        }
      }else{
        this.setState({err:true , errorMsg:"Invalid Mobile No"})
      }
    }else{

      this.setState({err: true, errorMsg: "Invalid Email ID"})
    }
  }
  render() {
    const mainDiv = this.state.outletList.map((val, i) => <TmeRow key={i} outletTme rowData={val} {...this.props} />);
    return (
      <div className="main">
        <Header
          pageTitle={`${'TME : Details '}${this.state.first_name}${' '}${this.state.last_name}`}
          {...this.props}
        />
        <SideMenu {...this.props} key="" />
        {
          this.state.edit ?
            <BodyHead
              pageTitle={`${'ID  : '}${this.state.bat_id}`}
              pageButton={'SAVE'}
              onClick={() => this.addTme()} {...this.props}
            />
            : <BodyHead
              pageButton={'SAVE'}
              onClick={() => this.addTme()}
            />
        }

        {
          this.state.err ?
            <div style={{ minHeight: '55px', marginLeft: '24.8%' }}>
              <div
                className="alert alert-danger" role="alert"
                style={{ width: '100%', margin: 'auto', textAlign: 'center' }}
              >
                <strong>{this.state.errorMsg}</strong>
              </div>
            </div>
        :
        null
        }
        <DialogBox handleClose={this.handleClose} handleAssign={this.handleAssign} open={this.state.open} {...this.props} />
        <Box>
          <div className="modal-body row m-0">
            <div className="col-md-4 p-0">

              <form>
                <div className="form-group">
                  <h6>BAT ID :
                    </h6>
                  <input
                    type="text" disabled={this.state.edit} className="form-control" id="bat_id" onChange={(e) => {
                      this.setState({
                        bat_id: e.target.value,
                      });
                    }} value={this.state.bat_id}
                  />
                </div>
                <div className="form-group">
                  <h6>Password:</h6>
                  { this.state.edit ?
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            password: e.target.value,
                          });
                        }}
                        value={this.state.password}
                      />
                      <span
                        className="input-group-addon" onClick={() => {
                          this.props.onChangePassword(this.state.id, 'TME', this.state.password).then((val) => {
                            this.props.onGetTme(this.state.id);
                          });
                        }}
                      >Change Password</span>
                    </div> : <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                          this.setState({
                            password: e.target.value,
                          });
                        }}
                        value={this.state.password}
                      />
                    </div>}
                </div>
              </form>

              <div className="col-md-6 p-0" style={{ padding: '0 10px 0 0' }}>
                <form>
                  <div className="form-group">
                    <h6>First Name</h6>
                    <input
                      type="text" className="form-control" id="usr" onChange={(e) => {
                        this.setState({
                          first_name: e.target.value,
                        });
                      }} value={this.state.first_name}
                    />
                  </div>
                </form>
              </div>
              <div
                className="col-md-6 " style={{
                  padding: '0 0 0 10px',
                }}
              >
                <form>
                  <div className="form-group">
                    <h6>Last Name</h6>
                    <input
                      type="text" className="form-control" id="last_name" onChange={(e) => {
                        this.setState({
                          last_name: e.target.value,
                        });
                      }} value={this.state.last_name}
                    />
                  </div>
                </form>
              </div>
              <form>

                <div className="form-group">
                  <h6>Email</h6>
                  <input
                    type="email" disabled={this.state.edit} className="form-control" id="usr_email" onChange={(e) => {
                      this.setState({
                        email: e.target.value,
                      });
                    }} value={this.state.email}
                  />
                </div>

                <div className="form-group">
                  <h6>Mobile Number</h6>
                  <input
                    type="text" className="form-control" onChange={(e) => {
                      this.setState({
                        mobile_no: e.target.value,
                      });
                    }} value={this.state.mobile_no}
                  />
                </div>
              </form>
            </div>
            {
              this.state.edit ? <div>
                <div className="col-md-8 p-0">
                  <label> Outlets : </label>
                  <Table cols={['ID', 'BAT ID', 'Outlet Name', 'Points', '', '', '']} >
                    {mainDiv}
                  </Table>
                </div>
                <div className=" col-md-4 form-group">
                  <Button buttonType={'primary'} onClick={() => this.handleOpen()}>Assign Outlets</Button>
                </div></div> : null
            }
          </div>
        </Box>
      </div>
    );
  }
}

const styles = {

  model: {
    opacity: '1',
  },

  modelbody: {
    height: '500px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #4A4A4A',
    borderRadius: '20px',
  },
};
