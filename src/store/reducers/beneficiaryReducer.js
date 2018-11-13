import * as actionTypes from "../actions/actionTypes";

const initialState = {
  activeBeneficiaryList: [],
  inActiveBeneficiaryList: [],
  activeOperationalUsers: [],
  inActiveOperationalUsers: [],
  // beneficiaryList: [],
  beneficiaryError: null,
  currentBeneficiary: null,
  bulkUploadHistory: [],
  bulkUserData: [],
  bulkUserError: false
  //operationalUsers : [],
  //inactiveOperationalUsers : []
};

const beneficiaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BENEFICIARY_LIST:
      return {
        ...state,
        activeBeneficiaryList: action.activeBeneficiaryList,
        inActiveBeneficiaryList: action.inActiveBeneficiaryList,
        activeOperationalUsers: action.activeOperationalUsers,
        inActiveOperationalUsers: action.inActiveOperationalUsers,
        beneficiaryError: null
      };
    case actionTypes.LOG_BENEFICIARY_ERROR:
      return {
        ...state,
        beneficiaryError: action.error
      };
    case actionTypes.STORE_CURRENT_BENEFICIARY:
      return {
        ...state,
        currentBeneficiary: action.currentBeneficiary,
        beneficiaryError: null
      };
    case actionTypes.STORE_BULK_UPLOAD_HISTORY:
      return {
        ...state,
        bulkUploadHistory: action.bulkUploadHistory,
        beneficiaryError: null
      };
    case actionTypes.CLEAR_BENEFICIARY_ERROR:
      return {
        ...state,
        beneficiaryError: null
      };
    case actionTypes.VALIDATE_BULKDATA_SUCCESS:
      return {
        ...state,
        bulkUserError: false,
        beneficiaryError: null
      };
    case actionTypes.VALIDATE_BULKDATA_ERROR:
      return {
        ...state,
        bulkUserData: action.bulkUserData,
        bulkUserError: true,
        beneficiaryError: null
      };
    default:
      return state;
  }
};
export default beneficiaryReducer;
