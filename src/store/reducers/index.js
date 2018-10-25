import { combineReducers } from "redux";
import dashboardReducer from './dashboardReducer';
import statesReducer from './statesReducer';
import districtReducer from './districtReducer';
import beneficiaryReducer from './beneficiaryReducer';
import cropsReducer from './cropsReducer';
import rolesReducer from './rolesReducer';
import loginReducer from './loginReducer';
import villageReducer from './villageReducer';
import grampanchayatReducer from './grampanchayatReducer';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    stateReducer : statesReducer,
    districtReducer : districtReducer,
    beneficiaryReducer : beneficiaryReducer,
    cropsReducer:cropsReducer,
    rolesReducer:rolesReducer,
    loginReducer: loginReducer,
    villageReducer :villageReducer,
    grampanchayatReducer: grampanchayatReducer,
    languageReducer : languageReducer
});

export default rootReducer;
