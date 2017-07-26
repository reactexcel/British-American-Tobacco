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

import styles from './menu.scss';

export default class SideMenu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			openBrand : false,
		};
		this.navigate = this.navigate.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	navigate (data) {
		this.props.router.push(data);
	}

	toggleMenu (menu) {
		if (menu == 'brand') {
			this.setState({
				openBrand : !this.state.openBrand,
			});
		}
	}

	isActive (params) {
		if (typeof params === 'string') {
			return this.props.router.isActive(params) ? 'active' : 'default';
		} else if (typeof params === 'object') {
			return _.some(params, url => this.props.router.isActive(url),
			) ? 'active' : 'default';
		}
	}

	render () {
		return (
			<div className="col-3 p-0">
				<List className="menu-block">
					<ListItem className={ 'menu-item ' + this.isActive('/home') }
						primaryText="Home"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">home</FontIcon>
						}
					/>

					<ListItem className={ 'menu-item with-children ' + this.isActive([ '/outlets', '/addoutlet' ]) }
						primaryText="Outlets"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">insert_drive_file</FontIcon>
						}
						initiallyOpen={ this.isActive([ '/outlets', '/addoutlet' ]) == 'active' }
						primaryTogglesNestedList={true}
						nestedItems={[
							<ListItem className={ 'menu-subitem ' + this.isActive('/outlets') }
								key={1}
								onTouchTap={ () => {
									this.navigate('/outlets');
								}
									}
								primaryText="View Outlets"
							/>,
							<ListItem className={ 'menu-subitem ' + this.isActive('/addoutlet') }
								key={2}
								onTouchTap={ () => {
									this.navigate('/addoutlet');
								}
									}
								primaryText="Add Outlets"
							/>,
						]}
					/>

					<ListItem className={ 'menu-item ' + this.isActive('/rebatereq') }
						primaryText="Rebate Requests"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">supervisor_account</FontIcon>
						}
						onTouchTap={ () => {
							this.navigate('/rebatereq');
						}}
					/>

					<ListItem className={ 'menu-item ' + this.isActive('/allcampaigns') }
						primaryText="Campaigns"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">account_balance_wallet</FontIcon>
						}
						onTouchTap={ () => {
							this.navigate('/allcampaigns');
						}}
					/>

					<ListItem className={ 'menu-item ' + this.isActive('/upload') }
						primaryText="Upload Data"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">face</FontIcon>
						}
						onTouchTap={ () => {
							this.navigate('/upload');
						}}
					/>

					<ListItem className={ 'menu-item with-children ' + this.isActive([ '/allskus', '/allbrand', '/promotions' ]) }
						primaryText="Brands"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">face</FontIcon>
						}
						initiallyOpen={ this.isActive([ '/allskus', '/allbrand', '/promotions' ]) == 'active' }
						primaryTogglesNestedList
						nestedItems={[
							<ListItem className={ 'menu-subitem ' + this.isActive('/allskus') }
								key={1}
								onTouchTap={ () => {
									this.navigate('/allskus');
								}}
								primaryText="All Sku"
							/>,
							<ListItem className={ 'menu-subitem ' + this.isActive('/allbrand') }
								key={2}
								onTouchTap={ () => {
									this.navigate('/allbrand');
								}}
								primaryText="All Brands"
							/>,
							<ListItem className={ 'menu-subitem ' + this.isActive('/promotions') }
								key={3}
								onTouchTap={ () => {
									this.navigate('/promotions');
								}}
								primaryText="Promotions"
							/>,
						]}
					/>

					<ListItem className={ 'menu-item with-children ' + this.isActive([ '/tmeList', '/membership' ]) }
						primaryText="Account & Settings"
						leftIcon = {
							<FontIcon className="material-icons menu-icon">face</FontIcon>
						}
						initiallyOpen={ this.isActive([ '/tmeList', '/membership' ]) == 'active' }
						primaryTogglesNestedList
						nestedItems={[
							<ListItem className={ 'menu-subitem ' + this.isActive('/tmeList') }
								key={1}
								onTouchTap={ () => {
									this.navigate('/tmeList');
								}
									}
								primaryText="TME Accounts"
							/>,
							<ListItem className={ 'menu-subitem ' + this.isActive('/membership') }
								key={2}
								onTouchTap={ () => {
									this.navigate('/membership');
								}
									}
								primaryText="Membership Setting"
							/>,
						]}
					/>
				</List>
			</div>
		);
	}
}
