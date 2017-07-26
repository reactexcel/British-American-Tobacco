import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import { Router, Route, Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import muiThemeable from 'material-ui/styles/muiThemeable';

const style = {
  paper: {
    float: 'left',
    position: 'absolute',
    backgroundColor: '#FAFAFA',
    marginLeft: '0%',
    marginTop: '3%',
    width: '23.2%',
    opacity: '0.8',
    border: '0px ',
    color: '#1F8AFD',
  },
  list: {
    fontSize: '16px',
    opacity: '0.7',
    marginLeft: '1%',
  },
  sublist: {
    backgroundColor: 'rgba(245,247,247,0.98)',
    opacity: '0.7',
    marginLeft: '14%',
  },
  sublists: {
    color: '#007AFF',
    opacity: '0.7',
    marginLeft: '14%',
  },
  angle: {
    fontSize: '25px',
    fontWeight: '900',
  },
};

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBrand: false,
    };
    this.navigate = this.navigate.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  navigate(data) {
    this.props.router.push(data);
  }

  toggleMenu(menu) {
    if (menu == 'brand') {
      this.setState({
        openBrand: !this.state.openBrand,
      });
    }
  }

  render() {
    return (
      <div className="col-3 p-0 ">
        <List style={style.paper}>
          <ListItem
            style={style.list} primaryText="Home"
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF', opacity: '0.8' }}> home </FontIcon>}
          />

          <ListItem
            style={{ color: '#007AFF' }}
            primaryText="Outlets"
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF' }}>insert_drive_file</FontIcon>}
            initiallyOpen
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                style={style.sublists}
                key={1}
                onTouchTap={() => {
                  this.navigate('/outlets');
                }
                    }

                primaryText="View Outlets"
              />,
              <ListItem
                style={style.sublist}
                key={2}
                onTouchTap={() => { this.navigate('/addoutlet'); }}
                primaryText="Add Outlet"
              />,
            ]}
          />
          <Divider />
          <ListItem
            style={style.list} primaryText="Rebate Requests"
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF' }}>supervisor_account</FontIcon>}
            onTouchTap={() => { this.navigate('/rebatereq'); }}
          />

          <ListItem
            style={style.list} primaryText="Campaigns"
            onTouchTap={() => { this.navigate('/allcampaigns'); }}
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF' }}>account_balance_wallet</FontIcon>}
          />

          <ListItem
            style={style.list} primaryText="Upload Data"
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF' }}>face</FontIcon>}
            onTouchTap={() => { this.navigate('/upload'); }}
          />

          <ListItem
            style={style.list}
            primaryText="Brands"
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF' }}>face</FontIcon>}
            rightIcon={<div style={style.angle} onClick={() => this.toggleMenu('brand')}>
              {this.state.openBrand ? <i className="fa fa-angle-up" aria-hidden="true" />
                      : <i className="fa fa-angle-down" aria-hidden="true" />}</div>}
            open={this.state.openBrand}
            nestedItems={[
              <ListItem
                style={style.sublists}
                key={1}
                onTouchTap={() => { this.navigate('/allskus'); }}
                primaryText="All Sku"
              />,
              <ListItem
                style={style.sublist}
                key={2}
                onTouchTap={() => { this.navigate('/allbrand'); }}
                primaryText="All Brands"
              />,
              <ListItem
                style={style.sublist}
                key={3}
                onTouchTap={() => { this.navigate('/promotions'); }}
                primaryText="Promotions"
              />,
            ]}
          />
          <ListItem
            style={style.list}
            primaryText="Account & Settings"
            leftIcon={<FontIcon className="material-icons" style={{ color: '#007AFF' }}>face</FontIcon>}
            initiallyOpen={false}
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                style={style.sublists}
                key={1}

                onTouchTap={() => { this.navigate('/tmeList'); }}
                primaryText="TME Accounts"
              />,
              <ListItem
                style={style.sublist}
                key={2}
                onTouchTap={() => { this.navigate('/membership'); }}
                primaryText="Membership Settings"
              />,
            ]}
          />
        </List>
      </div>

    );
  }
}
