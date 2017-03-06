import React from 'react';
import styles from '../styles/index.scss';
import TextField from 'material-ui/TextField';
import {Router, Route, IndexRoute, hashHistory, link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class App extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
