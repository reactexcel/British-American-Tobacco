import React from 'react';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import style from './membership.scss';
import { CONFIG } from '../../config/index.js';

export default class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type_name: '',
      rebate_rate: '',
      min_required_points: '',
      order: '',
      id: 0,
    };
    this.addMember = this.addMember.bind(this);
  }

  componentWillReceiveProps (props){
    if(props.id == ''){
      this.setState({
        open: props.open,
        id: '',
        type_name: '',
        rebate_rate: '',
        min_required_points: '',
        order: '',
      })
    } else {
        this.setState({
          open: props.open,
          id: props.member.id || '',
          type_name: props.member.type_name || '',
          rebate_rate: props.member.rebate_rate || '',
          min_required_points: props.member.min_required_points || '',
          order: props.member.order || '',
        })
    }
  }

  addMember() {
    const memberData = {
      type_name: this.state.type_name,
      rebate_rate: this.state.rebate_rate,
      min_required_points: this.state.min_required_points,
      order: this.state.order,
    };
    if (this.state.id === ''){
      this.props.onAddMember(memberData).then((val)=>{
        console.log(val,"-**-*-*-*-*-*--**-");
        this.props.onMemberList().then((val)=>{
          console.log(val,"///////////////");
          this.props.handleCloseDialog();
        });
      });
    } else {
      this.props.onUpdateMember(this.state.id, memberData).then((val)=>{
            this.props.onMemberList().then((val)=>{
              this.props.handleCloseDialog();
              
            });
      });
    }
  }

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog
          modal={false}
          open={this.state.open}
          autoDetectWindowHeight
          autoScrollBodyContent
        >

          <div className="body" >
            <div className="row m-0">
              <div className="col-xs-12">
                <div
                  className="title"
                  style={{ marginTop: '0%', marginLeft: '10%' }}
                >
                  {'ADD/EDIT MEMBERSHIP'}</div>

                <div className="row" />
                <div className="col-md-10">
                  <label style={{ marginLeft: '13%' }}>Membership Name</label>
                  <input type="text"
                    className="form-control input-box"
                    onChange={(e) => {
                    this.setState({ type_name: e.target.value });
                  }} value={this.state.type_name}/>

                </div>
                <div className="col-md-10">
                  <label style={{ marginLeft: '13%' }}>Points required</label>
                  <input type="number" value={this.state.min_required_points} className="form-control input-box"
                    onChange={(e) => {
                        this.setState({
                        min_required_points: e.target.value,
                        });
                      }}/>
                </div>

                <div className="col-md-10" style={{ marginLeft: '8%' }}>
                  <div className="col-md-6">
                    <label>Order</label>
                    <input type="number"value={this.state.order}   className="form-control input-box-sml" onChange={(e) => {
                          this.setState({
                          order: e.target.value,
                          });
                        }}/>
                  </div>

                  <div className="col-md-6">
                    <label>Rebate Rate (1 point)</label>
                    <input type="text"  value={this.state.rebate_rate} className="form-control input-box-sml" onChange={(e) => {
                          this.setState({
                          rebate_rate: e.target.value,
                          });
                        }}/>
                  </div>
                </div>

                <div
                  className="col-md-8" style={{ marginLeft: '8%',
                    marginTop: '3%' }}
                >
                  <Checkbox
                    label="Set as Default"
                    style={style}
                    iconStyle={{
                      opacity: '0.9',
                      marginLeft: '7px',
                      marginTop: '2px'
                    }} labelStyle={{
                      opacity: '0.8',
                      fontFamily: 'Roboto',
                      marginLeft: '1px',
                    }}
                  />
                </div>

                <div className="col-md-12 model-text-sml">
                  <p>if set,all new outlets will be assigned this membership status
                when added to the system</p>
                </div>
                <div className="col-md-12" style={{ marginLeft: '2%' }}>
                  <div className="col-md-6">
                    <button
                      onClick={(event) => { this.props.handleCloseDialog(event); }}
                      type="button btn-default"
                      style={{ marginLeft: '14%',
                        width: '77%',
                        height: '49px',
                        backgroundColor: '#4A4A4A',
                        color: '#fff' }}
                      className="btn btn-default"
                    >CANCEL
                </button>
                  </div>

                  <div
                    className="col-md-6" style={{
                      padding: '0 0px 0 0',
                    }}
                  >
                    <button onClick={() => {this.addMember();}}
                      type="button btn-default"
                      style={{ marginLeft: '1%',
                        width: '68%',
                        height: '49px',
                        backgroundColor: '#1F8AFD',
                        color: '#fff' }}
                      className="btn btn-default btny"
                    >APPLY</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>

      </div>
    );
  }
}
