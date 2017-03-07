import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  paper: {
    opacity:"0.7",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "12px",
    display: 'inline-block',
    height:"100%",
    position:"fixed",
    float: 'left',
    marginTop:"2%"

  },
  header :{
    opacity:"0.8",
    position:"fixed",
    backgroundColor:"#FAFAFA",
    height:"10%",
    marginLeft:"2%",
    marginTop:"0px"

  }

};

export default class Home extends React.Component {
  render() {
      return (
        <div className="main">
          <div className="heading pull-left"><h4 style={{fontSize:"30px"}}>Admin Portal</h4></div>
          <div className="leftbox">
        </div>

        <div>
          <Paper style={style.paper}>
            <Menu maxHeight="200%">
              
        <MenuItem style={{opacity:"0.9"}}
          primaryText="Home"
          leftIcon={<FontIcon className="material-icons" style={{color: '#007AFF'}}>home</FontIcon>} />
        <MenuItem
          primaryText="Sellers"
          leftIcon={<FontIcon className="material-icons" style={{color: '#007AFF'}}>supervisor_account</FontIcon>} />

        <MenuItem
          primaryText="Redumption request "
          leftIcon={<FontIcon className="material-icons" style={{color: '#007AFF'}}>supervisor_account</FontIcon>}
         />
        <Divider />

        <MenuItem
          primaryText="Advertising"
          leftIcon={<FontIcon className="material-icons" style={{color: '#007AFF'}}>account_balance_wallet</FontIcon>} />
        <Divider />

        <MenuItem primaryText="Upload data"
            leftIcon={<FontIcon className="material-icons" style={{color: '#007AFF'}}>file_upload</FontIcon>} />
          <MenuItem
            primaryText="Brand Promotion"
            leftIcon={<FontIcon className="material-icons" style={{color: '#007AFF'}}>settings</FontIcon>}/>
        <Divider />
      </Menu>
    </Paper>
  </div>

    <div className="row">
      <div className="col xs-12">
        <div className="box p-a">
          <span style={{fontFamily:"Nunito', sans-serif",fontSize:"20px",fontWeight: "900",lineHeight: "85px",color: "#5E5E5E",opacity:"0.9",marginLeft:"8px"}}>Add Campaign</span>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col xs-12">
        <div className="box2 p-a">
          <span style={{fontFamily:"Nunito', sans-serif",fontSize:"16px",fontWeight: "500",lineHeight: "55px",color: "#667685",opacity:"0.9",marginLeft:"12px"}}>Headline</span>
          <div className="form-group">
            <input type="text" className="form-control" style={{width:"47%",marginLeft:"1%",height:"45px"}} id="usr"/>
          </div>
        </div>
      </div>
    </div>
</div>

    );
  }
}
