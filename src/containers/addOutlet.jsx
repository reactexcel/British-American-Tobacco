import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import * as actions from '../actions/outlets/index';
import * as tmeActions from '../actions/tme/index';
import { CONFIG } from '../config/index';
import OutletsDetails from '../components/outlets/outletdetails';

class AddOutletContainer extends React.Component {
	constructor (props) {
		super(props);
	}

	componentWillReceiveProps (props) {
		const loggedIn = localStorage.getItem('bat-access-token');
		if (loggedIn == null || props.logData.tokenStatus === 'Expired') {
			this.props.router.push('/');
		}
	}
	handleBack () {
		this.props.router.push('/outlets');
	}

	render () {
		return (
			<div>
				<OutletsDetails handleBack={this.handleBack.bind(this)} {...this.props} />
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		loader  : state.loader.toJS(),
		logData : state.login.toJS(),
		outlets : state.outlets.toJS(),
	};
}

const mapDispatchToProps = dispatch => ({
	onAddOutlet      : outletData => dispatch(actions.addOutlet(outletData)),
	onGetOutletById  : outletId => dispatch(actions.onGetOutletById(outletId)),
	onUpdateOutlet   : (outletData, outletId) => dispatch(actions.updateOutlet(outletData, outletId)),
	onChangePassword : (id, username, newPass) => dispatch(actions.onChangePassword(id, username, newPass)),
	onAssign         : (tmeId, outletIDs) => dispatch(tmeActions.onAssign(tmeId, outletIDs)),
	onTmeList        : (page, perPageLimit) => dispatch(tmeActions.tmeList(-1, 13)),
	onMembershipList : () => dispatch(actions.onMembershipList())
});

const VisibleAddOutletContainer = connect(mapStateToProps, mapDispatchToProps)(AddOutletContainer);

const RouterVisibleAddOutletContainer = withRouter(VisibleAddOutletContainer);

export default RouterVisibleAddOutletContainer;
