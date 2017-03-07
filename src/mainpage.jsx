import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import {Router, Route, Link} from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon';

const style = {
	"fontFamily": "'Nunito', sans-serif",
	"fontSize": "12px",
  "fontWeight": "bold",
};
const underlineStyle = {
  "left":"-31px"
}
export default class Portal extends React.Component {
    render() {
        return (
              <div className="login">
              <div className="row">
                <div className="col-md-offset-5">
                  <h3 style={{opacity:"0.8", marginBottom:"35px",marginLeft:"7%"}}>Admin Portal</h3>
                </div>
                <div className="col-md-offset-4">
                  <div className="panel loginbox ">
                    <div className="col-md-offset-4">
                      <h4 className="signin">Sign In</h4>
                    </div>
                    <div className="space"></div>
                    <div className="col-md-offset-1 col-md-10">
                      <form>
                        <div className="form-group">
                          <span style={{position:"absolute", marginTop:"30px",marginLeft:"15px", fontSize:"20px",fontWeight: "800",opacity:"0.2"}}><i className="material-icons">mail_outline</i></span>
                          <TextField
                            className={"email"}
                            label="Email addresss"
                            style={style}
                            floatingLabelStyle={{paddingLeft:"48px",marginTop:"-5px",}}
                            inputStyle={{paddingLeft:"39px"}}
                            fullWidth={true}
                            floatingLabelText="Email address"/>
                        </div>

                        <div className="form-group">
                        <span style={{position:"absolute", marginTop:"30px",marginLeft:"15px", fontSize:"23px",fontWeight: "800",opacity:"0.2"}}><i className="material-icons">https</i></span>
                          <TextField
                            label="Password"
                            fullWidth={true}
                            style={style}
                            floatingLabelStyle={{paddingLeft:"48px",marginTop:"-5px"}}
                            inputStyle={{paddingLeft:"38px"}}
                            icon={<i className="fa fa-lock" aria-hidden="true"></i>}
                            floatingLabelText="Password"/>
                        </div>
                        <div>
                          <Checkbox label="remember me"
                              style={style}
                              iconStyle={{opacity:"0.6",marginLeft:"8px"}}
                              labelStyle={{opacity:"0.6",fontFamily: "Nunito', sans-serif",marginLeft:"1px"}}/>
                          </div>
                        <div className="space2"></div>
                        <input type="button" className="btn buttonbox" style={{fontFamily: "Nunito', sans-serif",fontWeight:"600"}} value="LOGIN"></input>
                    </form>
                  </div>
                 </div>
                </div>
              </div>
              </div>
        );
    }
}
