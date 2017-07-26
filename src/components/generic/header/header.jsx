import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory, Link, withRouter } from 'react-router';
import styles from './header.scss';

export default class Header extends React.Component {
	logout () {
		localStorage.removeItem('bat-access-token');
		this.props.router.push('/');
	}

	render () {
		return (
			<div className="header-block">
				<div className="pull-left col-sm-3">
					<h4 className="app-logo">Max Admin</h4>
					<span className="logout-btn"
						  onClick={ () => this.logout() }>
						  Logout
					</span>
				</div>

				<div className="app-header white box-shadow m-b">
					<div className="navbar navhead">
						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
							<i className="material-icons" style={{ marginTop: '16px', marginLeft: '6px', color: '#1F8AFD' }} >&#xe5d2;</i>
						</a>
						<div className="navbar-item pull-left h5" style={{ marginTop: '20px', color: '#4A4A4A', fontSize: '14px', fontFamily: 'Roboto', marginLeft: '8px' }} id="pageTitle">{this.props.pageTitle}</div>
					</div>
					<div className="row no-gutter" />
				</div>
			</div>
		);
	}
}
