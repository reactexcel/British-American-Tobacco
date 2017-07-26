import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Router, Route, Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import CircularProgress from 'material-ui/CircularProgress';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import BigButton from '../form/BigButtons.jsx';
import styles from './login.scss';

const style = {
  fontFamily: 'Roboto',
  fontSize: '12px',
  fontWeight: '400',
};
const underlineStyle = {
  left: '-31px',
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errUserName: '',
      errPassword: '',
      error: '',
    };
    this.login = this.login.bind(this);
  }
  login(evt) {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    let key = true;
    if (_.isEmpty(user.username)) {
      key = false;
      this.setState({
        errUserName: 'username empty',
      });
    } else {
      key = true;
      this.setState({
        errUserName: '',
      });
    }
    if (_.isEmpty(user.password)) {
      key = false;
      this.setState({
        errPassword: 'password empty',
      });
    } else {
      key = true;
      this.setState({
        errPassword: '',
      });
    }
    if (key) {
      this.props.signIn(user.username, user.password).then(() => {
        this.setState({
          username: '',
          password: '',
          error: '',
        });
	     this.props.router.push('/outlets');
      }).catch((err) => {
        this.setState({
          error: err,
        });
      });
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <div className="row login">
          <div className="col-md-offset-5">
            <h3
              style={{
                opacity: '0.8',
                marginBottom: '35px',
                marginLeft: '5%',
              }}
            >Max - Admin Portal</h3>
          </div>
          <div className="col-md-offset-4">
            <div className="panel loginbox ">
              <div className="col-md-offset-4">
                <h4 className="signin">Sign In</h4>
              </div>
              <div style={{ minHeight: '68px' }}>
                {!_.isEmpty(this.state.error) ?
                  <div className="alert alert-danger" role="alert" style={{ width: '80%', margin: 'auto' }}>
                    <strong>{this.state.error}</strong>
                  </div>
									:
									''
								}
              </div>
              <div className="col-md-offset-1 col-md-10">
                <form autoComplete="off" >
                  <div className="form-group">
                    <span
                      style={{
                        position: 'absolute',
                        marginTop: '30px',
                        marginLeft: '15px',
                        fontSize: '20px',
                        fontWeight: '800',
                        opacity: '0.54',
                      }}
                    >
                      <i className="material-icons">mail_outline</i>
                    </span>
                    <TextField
                      className={'email'}
                      value={this.state.username}
                      label="Email addresss"
                      style={style}
                      floatingLabelStyle={{
                        paddingLeft: '49px',
                        marginTop: '-5px',
                        fontSize: '12px',
                      }} inputStyle={{
                        paddingLeft: '49px',
                        paddingBottom: '14px',
                      }}
                      fullWidth
                      errorText={this.state.errUserName}
                      floatingLabelText="Email address"
                      onChange={(e) => {
                        this.setState({ username: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <span
                      style={{
                        position: 'absolute',
                        marginTop: '30px',
                        marginLeft: '13px',
                        fontSize: '23px',
                        fontWeight: '800',
                        opacity: '0.54',
                      }}
                    >
                      <i className="material-icons">https</i>
                    </span>
                    <TextField
                      label="Password"
                      fullWidth
                      style={style}
                      value={this.state.password}
                      errorText={this.state.errPassword}
                      type="password"
                      floatingLabelStyle={{
                        paddingLeft: '48px',
                        marginTop: '-5px',
                        fontSize: '12px',
                      }}
                      icon={<i className="fa fa-lock" aria-hidden="false" />}
                      inputStyle={{
                        paddingLeft: '47px',
                        paddingBottom: '14px',
                      }} floatingLabelText="Password" onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>
                  <div>
                    <Checkbox
                      label="Remember me"
                      style={style}
                      iconStyle={{
                        opacity: '0.9',
                        marginLeft: '7px',
                      }} labelStyle={{
                        opacity: '0.8',
                        fontFamily: 'Roboto',
                        marginLeft: '1px',
                      }}
                    />
                  </div>
                  <div className="space2" />
                  {this.props.loader.show_loading ?
                    <div style={{ textAlign: 'center' }}>
                      <CircularProgress />
                    </div>
									:
                    <BigButton {...this.props} onClick={this.login}>LOGIN</BigButton>
									}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
