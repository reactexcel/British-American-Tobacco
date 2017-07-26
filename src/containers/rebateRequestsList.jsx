import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRebateRequestsList } from '../actions/rebateRequest/rebateRequest.action';

import Header from '../components/generic/header/header';
import BodyHead from '../components/generic/bodyhead';
import SideMenu from '../components/generic/menu/menu';
import Box from '../components/layout/Box';
import Table from '../components/table/table';
import RebateRequestItem from '../components/rebate/rebateRequestItem';

class RebateRequestsList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			rebateRequestsList : [],
			config             : {
				page  : 1,
				limit : 15,
			},

		};
	}

	componentWillMount () {
		this.props.getRebateRequestsList(this.state.config);
	}

	render () {
		return (
			<div className="main">
				<Header pageTitle={'All rebate requests'} {...this.props} />
				<BodyHead
					pageTitle={'Rebate requests'}
					pageButton={'Refresh'}
					onClick={() => { this.props.getRebateRequestsList(this.state.config); }}
					{...this.props}
				/>
				<SideMenu {...this.props} key="" />
				<div className="main-body">
					<Box>
						{
							<Table cols={[ 'ID', 'BAT ID', 'Outlet name', 'Amount', '(- Points)', 'Status', 'Date', '' ]}>
								{
									this.props.rebateRequestsList.data.map(item => <RebateRequestItem key={item.id} item={item} />)
								}
							</Table>
						}
					</Box>
				</div>
			</div>
		);
	}
}

function mapStateToProps (state) {
	// whatever is returned will show up as props inside RebateRequests
	return {
		rebateRequestsList : state.rebateRequests.toJS(),
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({ getRebateRequestsList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RebateRequestsList);
