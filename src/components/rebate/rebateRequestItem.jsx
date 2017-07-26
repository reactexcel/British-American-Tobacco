import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';

import Button from '../../components/form/PrimaryButton';
import { applyRebateRequest, cancelRebateRequest } from '../../actions/rebateRequest/rebateRequest.action';

class RebateRequestItem extends Component {
	constructor (props) {
		super(props);

		this.state = {
			openApply  : false,
			openCancel : false,
		};
		this.handleRequest = this.handleRequest.bind(this);
		this.openApplyModal = this.openApplyModal.bind(this);
		this.closeApplyModal = this.closeApplyModal.bind(this);
		this.openCancelModal = this.openCancelModal.bind(this);
		this.closeCancelModal = this.closeCancelModal.bind(this);
	}

	componentWillMount () {
		const STYLES = {
			model : {
				opacity : '1',
			},

			modelbody : {
				height          : '357px',
				backgroundColor : '#FFFFFF',
				border          : '2px solid #4A4A4A',
				borderRadius    : '20px',
			},
		};
		this.styles = STYLES;
	}

	componentWillReceiveProps (nextProps) {
		console.log('nextProps', nextProps);
		if (nextProps.successApply.status === 200) {
			this.closeApplyModal();
			if (nextProps.successApply.result.id === nextProps.item.id) {
				this.props.item.status = nextProps.successApply.result.status;
				this.props.item.status_date = nextProps.successApply.result.status_date;
			}
		}
		if (nextProps.successCancel.status === 200) {
			this.closeCancelModal();
			if (nextProps.successCancel.result.id === nextProps.item.id) {
				this.props.item.status = nextProps.successCancel.result.status;
				this.props.item.status_date = nextProps.successCancel.result.status_date;
			}
		}
	}

	handleRequest (answer) {
		if (answer) {
			// Request has been confirmed
			this.props.applyRebateRequest(this.props.item.id);
		} else {
			// Request has been canceled
			this.props.cancelRebateRequest(this.props.item.id);
		}
		// this.props.router.push('/editoutlet');
	}

	openApplyModal () {
		this.setState({ openApply: true });
	}

	closeApplyModal () {
		this.setState({ openApply: false });
	}
	openCancelModal () {
		this.setState({ openCancel: true });
	}

	closeCancelModal () {
		this.setState({ openCancel: false });
	}
	render () {
		return (
			<tr className="text-center">
				<Dialog
					modal={false}
					OverlayStyle={this.styles}
					open={this.state.openApply}
					autoDetectWindowHeight
					onRequestClose={() => this.closeApplyModal()}
					>
					<div className="box2">
						<div className="title">Apply Rebate Requests</div>
						<div className="modeltext">
							By pressing confirm you acknowlege that a rebate of ${this.props.item.rebate_value} was
							given to {this.props.item.Outlet.outlet_name} for {this.props.item.redeemed_points} Points.
						</div>
						<button
							type="button"
							onClick={() => this.handleRequest(true)}
							className="btn btn-default modelbtn">
							CONFIRM
						</button>
						<p className="diss"
							onClick={() => this.closeApplyModal()}
							>Dismiss
						</p>
					</div>
				</Dialog>

				<Dialog
					modal={false}
					OverlayStyle={this.styles}
					open={this.state.openCancel}
					autoDetectWindowHeight
					onRequestClose={() => this.closeCancelModal()}>
					<div className="box2">
						<div className="title">Cancel Rebate Request</div>
						<div className="modeltext">
								By pressing confirm you acknowlege that a rebate of ${this.props.item.rebate_value} was
								given to {this.props.item.Outlet.outlet_name} for {this.props.item.redeemed_points} Points
								will be cancelled and points will be credited back to the Outlet Account
							</div>
						<button
							type="button"
							onClick={() => this.handleRequest(false)}
							className="btn btn-default modelbtn"
								>CONFIRM
							</button>
						<p className="diss"
							onClick={() => this.closeCancelModal()}
							>Dismiss
							</p>
					</div>
				</Dialog>

				<td>{this.props.item.id}</td>
				<td>{this.props.item.Outlet.bat_id}</td>
				<td>{this.props.item.Outlet.outlet_name}</td>
				<td>{this.props.item.rebate_value}</td>
				<td>{this.props.item.redeemed_points}</td>
				<td>{this.props.item.status}</td>
				<td>{moment(this.props.item.status_date).format('DD MMMM, YYYY')}</td>
				<td>{
						(this.props.item.status === 'pending')
						?
							<div>
								<Button children={'Apply'} {...this.props} onClick={ () => this.openApplyModal() }></Button>
								<Button children={'Cancel'} {...this.props} onClick={ () => this.openCancelModal() }></Button>
							</div>
						: (this.props.item.status === 'accepted')
							?
								<div>
									<Button children={'Apply'} {...this.props} disabled={'disabled'}></Button>
									<Button children={'Cancel'} {...this.props} onClick={ () => this.openCancelModal() }></Button>
								</div>
							:
								<div>
									<Button children={'Apply'} {...this.props} disabled={'disabled'}></Button>
									<Button children={'Cancel'} {...this.props} disabled={'disabled'}></Button>
								</div>
					}
				</td>
			</tr>
		);
	}
}

function mapStateToProps (state) {
	return {
		successApply  : state.rebateRequests.toJS().successApply,
		successCancel : state.rebateRequests.toJS().successCancel,
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		applyRebateRequest,
		cancelRebateRequest,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RebateRequestItem);
