import * as actionTypes from "../actions/actionTypes";

const initialState = {
  beneficiaryList: [],
  beneficiaryError: null,
  currentBeneficiary: null
};

const beneficiaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BENEFICIARY_LIST:
      return {
        ...state,
        beneficiaryList: action.beneficiaryList,
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
        currentBeneficiary: action.currentBeneficiary
      };
    default:
      return state;
  }
};
export default beneficiaryReducer;
