import { combineReducers } from 'redux'

import { loader } from './loader';
import { login } from './login';
import { outlets } from './viewoutlet';
import { skuList } from './allsku';
import { tmeList } from './tme';
import { membership } from './membership';
import { brands } from './allbrands';
import { report } from './report'
import { rebateRequests } from './rebateRequest.reducer'

export default combineReducers({
	loader,
	login,
	outlets,
	skuList,
	brands,
	report,
	rebateRequests,
	tmeList,
	membership,
});
