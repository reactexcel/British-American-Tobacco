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
                  <h3 className="header">Admin Portal</h3>
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
                          <span style={{position:"absolute", marginTop:"30px",marginLeft:"15px", fontSize:"20px",fontWeight: "800",opacity:"0.2"}}><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                          <TextField
                            className={"email"}
                            label="Email addresss"
                            style={style}
                            floatingLabelStyle={{paddingLeft:"38px",marginTop:"-5px",}}
                            inputStyle={{paddingLeft:"31px"}}
                            fullWidth={true}
                            floatingLabelText="Email address"/>
                        </div>

                        <div className="form-group">
                        <span style={{position:"absolute", marginTop:"30px",marginLeft:"15px", fontSize:"23px",fontWeight: "800",opacity:"0.2"}}><i className="fa fa-lock" aria-hidden="true"></i></span>
                          <TextField
                            label="Password"
                            fullWidth={true}
                            style={style}
                            floatingLabelStyle={{paddingLeft:"38px"}}
                            inputStyle={{paddingLeft:"25px"}}
                            icon={<i className="fa fa-lock" aria-hidden="true"></i>}
                            floatingLabelText="Password"/>
                        </div>
                        <div>
                          <Checkbox label="remember me"
                              style={style}
                              iconStyle={{opacity:"0.6"}}
                              labelStyle={{opacity:"0.6",fontFamily: "'Nunito', sans-serif",}}/>
                          </div>
                        <div className="space2"></div>
                        <input type="button" className="btn buttonbox" value="LOGIN"></input>
                    </form>
                  </div>
                 </div>
                </div>
              </div>
              </div>
        );
    }
}
