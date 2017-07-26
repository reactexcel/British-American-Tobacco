import axios from 'axios';
import moment from 'moment';
import async from 'async';
import { createAction } from 'redux-actions';
import { CONFIG } from '../../config/index';
import { show_loading, hide_loading } from '../loader';
import { tokenExpiredError } from '../login';

export const ACTION_SUCCESS_REPORT = 'ACTION_SUCCESS_REPORT';
export const ACTION_SUCCESS_ALL_REPORT = 'ACTION_SUCCESS_ALL_REPORT';

function getAsync_getReportById (reportId, type) {
	const accessToken = localStorage.getItem('bat-access-token');
	if (type === 'DELIVERY') {
		return axios.get('sales/get/DELIVERY/' + reportId);
	} else if (type === 'RETURN') {
		return axios.get('sales/get/RETURN/' + reportId);
	} else if (type === 'DELIVERY_RETURN') {
		return axios.get('sales/get/DELIVERY_RETURN/' + reportId);
	}
}
export function onGetReportById (reportId, type) {
	return (dispatch, getState) => new Promise(function (resolve, reject) {
		dispatch(show_loading());
		return getAsync_getReportById(reportId, type).then((res) => {
			dispatch(hide_loading());
			if (res.status === 200) {
				dispatch(success_getReportById(res.data));
				resolve();
			} else {
				dispatch(tokenExpiredError());
			}
		}, (error) => {
			dispatch(hide_loading());
			reject(error);
		});
	});
}
export function success_getReportById (data) {
	return createAction(ACTION_SUCCESS_REPORT)(data);
}

// start rollback
export const ACTION_SUCCESS_ROLLBACK = 'ACTION_SUCCESS_ROLLBACK';

function Async_doRollBack (reportId, type) {
	const accessToken = localStorage.getItem('bat-access-token');
	return axios.get('sales/rollback/' + type + '/' + reportId);
}
export function doRollBack (reportId, type) {
	return (dispatch, getState) => new Promise(function (resolve, reject) {
		dispatch(show_loading());
		return Async_doRollBack(reportId, type).then((res) => {
			dispatch(hide_loading());
			if (res.status === 200) {
				dispatch(getUploadedReports());
				dispatch(success_rollBack());
				resolve();
			} else {
				dispatch(tokenExpiredError());
			}
		}, (error) => {
			dispatch(hide_loading());
			reject(error);
		});
	});
}
export function success_rollBack (data) {
	return createAction(ACTION_SUCCESS_ROLLBACK)(data);
}
// end rollback

function getAsync_getUploadedReports () {
	const accessToken = localStorage.getItem('bat-access-token');
	return axios.get('report/get');
}

export function getUploadedReports () {
	return (dispatch, getState) => new Promise(function (resolve, reject) {
		dispatch(show_loading());
		return getAsync_getUploadedReports().then((res) => {
			dispatch(hide_loading());
			if (res.status === 200) {
				dispatch(success_getUploadedReports(res.data));
				resolve();
			} else {
				dispatch(tokenExpiredError());
			}
		}, (error) => {
			dispatch(hide_loading());
			reject(error);
		});
	});
}
export function success_getUploadedReports (data) {
	return createAction(ACTION_SUCCESS_ALL_REPORT)(data);
}

export function Async_uploadDeliveryCsvItem (reportId, item) {
	let V_sales_order_no = '';
	let V_transaction_value = '';
	let V_outlet_id = '';
	let V_sku_id = '';
	let V_posting_date = '';
	for (const key in item) {
		if (item.hasOwnProperty(key)) {
			if (key === 'Sales Order No.') {
				V_sales_order_no = item[ key ];
			} else if (key === 'Quantity') {
				V_transaction_value = item[ key ];
				V_transaction_value = V_transaction_value.replace(",", ".");
			} else if (key === 'Sell-to Customer No.') {
				V_outlet_id = item[ key ];
			} else if (key === 'Gen.No.') {
				V_sku_id = item[ key ];
			} else if (key === 'Posting Date') {
				V_posting_date = item[ key ];
			}
		}
	}
	const toBeUpload = {
		transaction_value   : V_transaction_value, // quantity
		transaction_details : JSON.stringify(item),
		sales_order_no      : V_sales_order_no,
		report_id           : reportId,
		outlet_id           : V_outlet_id, // sell-to Customer
		order_type          : 'DELIVERY',
		posting_date        : V_posting_date, // posting date
		sku_id              : V_sku_id,  // gen.No.
	};
	const accessToken = localStorage.getItem('bat-access-token');
	return axios.post('sales/upload', toBeUpload);
}
export function Async_uploadReturnCsvItem (reportId, item) {
	let V_sales_return_no = '';
	let V_transaction_value = '';
	let V_outlet_id = '';
	let V_sku_id = '';
	let V_posting_date = '';
	for (const key in item) {
		if (item.hasOwnProperty(key)) {
			if (key === 'Sales Return Order No.') {
				V_sales_return_no = item[ key ];
			} else if (key === 'Quantity') {
				V_transaction_value = item[ key ];
				V_transaction_value = V_transaction_value.replace(",", ".");
			} else if (key === 'Sell-to Customer No.') {
				V_outlet_id = item[ key ];
			} else if (key === 'Gen.No.') {
				V_sku_id = item[ key ];
			} else if (key === 'Posting Date') {
				V_posting_date = item[ key ];
			}
		}
	}
	const toBeUpload = {
		transaction_value   : V_transaction_value, // quantity
		transaction_details : JSON.stringify(item),
		sales_return_no     : V_sales_return_no,
		report_id           : reportId,
		outlet_id           : V_outlet_id, // sell-to Customer
		order_type          : 'RETURN',
		posting_date        : V_posting_date, // posting date
		sku_id              : V_sku_id,  // gen.No.
	};
	const accessToken = localStorage.getItem('bat-access-token');
	return axios.post('sales/upload', toBeUpload);
}

// create a report which will return report id
export function ASYNC_createReport (data) {
	const type = data.type;
	let deliveryFileName = data.deliveryFileName;
	let returnFileName = data.returnFileName;

	deliveryFileName = deliveryFileName.replace('.csv', '');
	deliveryFileName = deliveryFileName.trim();
	returnFileName = returnFileName.replace('.csv', '');
	returnFileName = returnFileName.trim();
	const accessToken = localStorage.getItem('bat-access-token');
	const dataToSave = {
		sales_file_title  : deliveryFileName,
		return_file_title : returnFileName,
		upload_date       : moment().format('DD-MM-YYYY'),
		rollback_by       : 1,
	};
	return axios.post('report/create', dataToSave);
}

function ASYNC_uploadCsv (reportId, type, csvData) {
	const failedCsvRows = [];
	return new Promise(function (resolve, reject) {
		async.each(csvData, (item, callback) => {
			let doUpload = true;
			if (!item.amount && !item.Quantity) {
				doUpload = false;
			}
			if (doUpload === true) {
				if (type == 'DELIVERY') {
					Async_uploadDeliveryCsvItem(reportId, item).then((res1) => {
						const checkStatus = res1.data.status;
						if (checkStatus == 0) {
							const r = {
								row   : item,
								error : res1.data,
							};
							failedCsvRows.push(r);
						}
						callback();
					}, () => {
						callback();
					});
				} else if (type == 'RETURN') {
					Async_uploadReturnCsvItem(reportId, item).then((res1) => {
						const checkStatus = res1.data.status;
						if (checkStatus == 0) {
							const r = {
								row   : item,
								error : res1.data,
							};
							failedCsvRows.push(r);
						}
						callback();
					}, () => {
						callback();
					});
				}
			} else {
				callback();
			}
		}, () => {
			resolve({ failedCsvRows });
		});
	});
}

export function uploadCsvReport (data) {
	let failedCsvRows = [];
	const type = data.type;
	if (type === 'DELIVERY' || type === 'RETURN') {
		const csvData = data.csvData;
		const fileName = data.fileName;
		let deliveryFileName = '';
		let returnFileName = '';
		if (type === 'DELIVERY') {
			deliveryFileName = fileName;
		} else if (type === 'RETURN') {
			returnFileName = fileName;
		}

		return (dispatch, getState) => new Promise(function (resolve, reject) {
			ASYNC_createReport({ type,
				deliveryFileName,
				returnFileName }).then((res) => {
					if (res.status === 200) {
						const newReportId = res.data.id;
						ASYNC_uploadCsv(newReportId, type, csvData).then((resDelivery) => {
							if (res.status === 200) {
								if (resDelivery.failedCsvRows && resDelivery.failedCsvRows.length > 0) {
									failedCsvRows = resDelivery.failedCsvRows;
								}
								dispatch(getUploadedReports());
								resolve({ newReportId,
									type,
									failedCsvRows });
							} else {
								dispatch(tokenExpiredError());
							}
						}, (error) => {
							reject(error);
						});
					} else {
						dispatch(tokenExpiredError());
					}
				}, (error) => {
					reject(error);
				});
		});
	} else if (type === 'DELIVERY_RETURN') {
		const deliveryData = data.csv_data_delivery;
		const returnData = data.csv_data_return;
		const deliveryFileName = deliveryData && deliveryData.fileName || '';
		const returnFileName = returnData && returnData.fileName || '';
		const deliveryCsvData = deliveryData && deliveryData.csvData || [];
		const returnCsvData = returnData && returnData.csvData || [];

		return (dispatch, getState) => new Promise(function (resolve, reject) {
			ASYNC_createReport({ type,
				deliveryFileName,
				returnFileName }).then((res) => {
					if (res.status === 200) {
						const newReportId = res.data.id;
						ASYNC_uploadCsv(newReportId, 'DELIVERY', deliveryCsvData).then((resDelivery) => {
							if (res.status === 200) {
								if (resDelivery.failedCsvRows && resDelivery.failedCsvRows.length > 0) {
									failedCsvRows = resDelivery.failedCsvRows;
								}
								ASYNC_uploadCsv(newReportId, 'RETURN', returnCsvData).then((resReturn) => {
									if (res.status === 200) {
										if (resReturn.failedCsvRows && resReturn.failedCsvRows.length > 0) {
										failedCsvRows = failedCsvRows.concat(resReturn.failedCsvRows);
									}
										dispatch(getUploadedReports());
										resolve({ newReportId,
										type,
										failedCsvRows });
									} else {
										dispatch(tokenExpiredError());
									}
								}, (error) => {
									reject(error);
								});
							} else {
								dispatch(tokenExpiredError());
							}
						}, (error) => {
							reject(error);
						});
					} else {
						dispatch(tokenExpiredError());
					}
				}, (error) => {
					reject(error);
				});
		});
	}
}
