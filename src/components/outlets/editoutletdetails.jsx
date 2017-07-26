import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import { Router, Route, Link } from 'react-router';
import Header from '../generic/header/header';
import OutletHead from '../generic/outlethead';
import SideMenu from '../generic/menu/menu';
import Button from '../form/PrimaryButton';
import Box from '../layout/Box';
import DialogBox from './dialog';
import EditPointsDialog from './EditPointsDialog';
import Table from '../table/table';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default class OutletDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openApply: false,
      id: 0,
      bat_id: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      mob: '',
      role: 1,
      storename: 'abcd',
      edit: false,
      outlet_name: '',
      membership_number: '',
      membership_id: '',
      birthday: '',
      errMsg: '',
      tmeList: [],
      tme_name: 0,
      memberList: []
    };
    this.addOutlet = this.addOutlet.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOpenApply = this.handleOpenApply.bind(this);
    this.handleCloseApply = this.handleCloseApply.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTme = this.handleTme.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    // this.linker = this.linker.bind(this);
  }

  componentWillMount() {
    this.props.onTmeList(-1, 13).then((val) => {
      this.setState({ tmeList: val.data });
    });
    const outletId = this.props.params.id;
    if (outletId != undefined) {
      this.props.onMembershipList().then((val)=>{
        this.setState({memberList: val})
      })
      this.setState({ id: outletId, edit: true });
      this.props.onGetOutletById(outletId).then((val) => {
      });
    }
  }

  componentWillReceiveProps(props) {
    console.log(props.outlets.outlet, this.state.edit);
    const outlet = props.outlets.outlet;
    if (this.state.edit && !_.isEmpty(outlet)) {
      this.setState({
        id: outlet.id || '',
        outlet_name: outlet.outlet_name || '',
        bat_id: outlet.bat_id || '',
        first_name: outlet.Outlet_Account.first_name || '',
        last_name: outlet.Outlet_Account.last_name || '',
        email: outlet.Outlet_Account.email || '',
        membership_number: outlet.Outlet_Account.membership_number || '',
        password: outlet.Outlet_Account.password,
        membership_id: outlet.membership_id.toString() || '',
        birthday: moment(outlet.Outlet_Account.birthday).format('YYYY-MM-DD'),
        tme_name: outlet.tme_id || '',
      });
    }
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleOpenApply() {
    this.setState({ openApply: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  handleCloseApply() {
    this.setState({ openApply: false });
  }
  handleTme(val) {
    this.props.onAssign(val, this.props.params.id).then((val) => {
      this.props.onGetOutletById(this.props.params.id);
    });
  }

  validateEmail(email) {
    const {bat_id, password, first_name, last_name, membership_number} = this.state ;
    if(bat_id === '' || password === '' || first_name === '' || last_name === '' || membership_number === ''){
      return true
    }else{
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }

  addOutlet() {
    const outletData = {
      bat_id: this.state.bat_id,
      outlet_name: this.state.outlet_name,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      membership_number: this.state.membership_number,
      membership_id: parseInt(this.state.membership_id),
      birthday: this.state.birthday,
    };
    const outletId = this.state.id;
    if(this.validateEmail(this.state.email)){
    if (!this.state.edit) {
      this.props.onAddOutlet(outletData).then((val) => {
        if (val.error) {
          this.setState({ errMsg: val.error });
        } else {
          this.props.handleBack();
        }
      });
    } else {
      this.props.onUpdateOutlet(outletData, outletId).then((msg) => {
        this.props.onGetOutletById(outletId);
        this.props.handleBack();
      });
      }
    }
  }
  render() {
    let memberList =  this.state.memberList.slice(0, 3)
    let memberType = memberList.map((val, i)=>{
        return <RadioButton
          key={i}
          className="col-md-4"
          value = {val.id.toString()}
          label={val.type_name}
          style={{ width: '8%', paddingLeft: '10px', opacity: '0.56' }}
        />
    })
    return (
      <div className="main">
        <Header
          pageTitle={`${'OUTLET : Details' + '  '}${this.state.bat_id}`}
          {...this.props}
        />
        <SideMenu {...this.props} key="" />
        {
    this.state.edit ?
      <OutletHead
        pageTitle={`${'OUTLET' + '  '}${this.state.bat_id}`}
        subTitle={'Life time earning (Points):'}
        selectName={'Assigned TME'}
        pageButton={'SAVE'}
        onClick={() => this.addOutlet()} {...this.props}
        tmeList={this.state.tmeList}
        handleTme={this.handleTme}
        tme_name={this.state.tme_name}
        edit={this.state.edit}
      />
    : <OutletHead
      pageButton={'SAVE'}
      onClick={() => this.addOutlet()}
      hidden
    />

    }
    <DialogBox handleClose={this.handleClose} open={this.state.open} {...this.props} />
        <EditPointsDialog
          handleCloseApply={this.handleCloseApply}
          openApply={this.state.openApply} {...this.props}
        />
        {
          this.props.outlets.error ?
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
          <div className="col-md-12">
            <div className="modal-body row m-0">
              <div className="col-md-4 p-0">
                <form>
                  <div className="form-group">
                    <h6>BAT ID :</h6>
                    <input
                      type="text" disabled={this.state.edit} className="form-control"
                      id="bat_id" onChange={(e) => {
                        this.setState({
                          bat_id: e.target.value,
                        });
                      }} value={this.state.bat_id}
                    />
                  </div>
                  <div className="form-group">
                    <h6>Membership Number:</h6>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.membership_number}
                      onChange={(e) => {
                        this.setState({
                          membership_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <h6>Password:</h6>
                    {
                      this.state.edit ?
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
                            className="input-group-addon"
                            onClick={() => {
                              this.props.onChangePassword(this.state.id, 'OUTLET', this.state.password).then((val) => {
                                this.props.onGetOutletById(this.state.id);
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
                      type="text" disabled={this.state.edit} className="form-control" id="usr"
                      onChange={(e) => {
                        this.setState({
                          email: e.target.value,
                        });
                      }} value={this.state.email}
                    />
                  </div>

                  <div className="form-group">
                    <h6>Outlet Name</h6>
                    <input
                      type="text" className="form-control" id="pwd" onChange={(e) => {
                        this.setState({
                          outlet_name: e.target.value,
                        });
                      }} value={this.state.outlet_name}
                    />
                  </div>
                  <div className="form-group">
                    <h6>Date Of Birth</h6>
                    <input
                      type="date" style={{ width: '100%' }}
                      className="form-control" id="pwd" onChange={(e) => {
                        this.setState({
                          birthday: e.target.value,
                        });
                      }} value={this.state.birthday}
                    />
                  </div>
                </form>
              </div>
              <div className="col-md-8 p-0" style = {{borderBottom: '1px solid #cccccc', padding: '16px 0 14px 0', marginLeft: '30px', width: '63%'}}>
                <div className="col-md-4 p-0 row" style = {{padding: '0px'}}>
                  <label>Membership Type</label>
                  <RadioButtonGroup
                    name="outlets"
                    style={{ display: 'flex' }}
                    defaultSelected = "1"
                    onChange={(e) => {
                      this.setState({ membership_id: e.target.value.toString() });
                    }}
                    valueSelected={this.state.membership_id}
                  >
                    {memberType}
                  </RadioButtonGroup>
                  {/* <hr className="hr" /> */}
                </div>
                <div className="col-md-offset-9">
                  <label>Rebate Rate (1 point)</label>
                  <input
                    type="text" className="form-control" style={{width: '107%'}} onChange={(e) => {
                      this.setState({
                        mob: e.target.value,
                      });
                    }} value={this.state.mob}
                  />
                </div>
              </div>
              {
                this.state.edit ?
                (<div>
                  <div className="col-md-8 p-0" style={style.set1}>
                    <div className="col-md-6 p-0" style={{padding: '0px'}}>
                      <label> Monthly Targets (Cartons) : </label>
                    </div>
                  </div>
                  <div className="col-md-8 p-0" style={style.set2}>
                    <div className="col-md-4 p-0" style={{padding: '0px'}}>
                      <h5 style={{marginBottom: '5px'}}>This month</h5>
                      <h4 style={{marginTop: '0px', fontSize: "24px", color: "black"}}><b>8000</b></h4>
                      <h5 className="link" onClick={this.handleOpen}>Edit</h5>
                    </div>
                    <div className="col-md-4 p-0">
                      <h5 style={{marginBottom: '5px'}}>Next month</h5>
                      <h4 style={{marginTop: '0px', fontSize: "24px", color: "black"}}><b>10000</b></h4>
                      <h5 className="link" onClick={this.handleOpen}>Edit</h5>
                    </div>
                    <div className="col-md-offset-9">
                      <h5 className="link" >{'Performance History'}</h5>
                    </div>
                    {/* <hr className="hr" /> */}
                  </div>
                  <div className="col-md-8 p-0" style={style.set1}>
                    <div className="col-md-4 p-0" style={{padding: '0px'}}>
                      <label>Point Balance :</label>
                      <h4 style={{marginTop: '0px', fontSize: "24px", color: "black"}}><b>3000</b></h4>
                      <h5 className="link" onClick={this.handleOpenApply}>Amend Points</h5>
                    </div>
                  </div>
                  <div className="col-md-8 p-0 " style={{ marginTop: '4%' }}>
                    <div className="col-md-3 p-0">
                      <label>Points History</label>
                    </div>
                    <div className="col-md-3 p-0">
                      <div className="form-group">
                        <select className="form-control" >
                          <option>ALL</option>
                        </select>
                      </div>
                    </div>
                    <Table cols={['ID', 'Type', 'Points', 'Details', '', '', 'Date']} />
                  </div></div>) : null
                }
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

const style = {
  model: {
    opacity: '1',
  },
  radio: {
    marginLeft: '1%',
    opacity: '0.7',
    display: 'inline-flex',
    flexDirection: 'left',
    position: 'relative',
  },
  modelbody: {
    height: '500px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #4A4A4A',
    borderRadius: '20px',
  },
  set1: {
    padding: '20px 0 0 0',
    marginLeft: '30px',
    width: '63%',
  },
  set2: {
    padding: '0px 0 15px 0',
    borderBottom: '1px solid #cccccc',
    width: '63%',
    marginLeft: '30px',
  }
};
