import * as actionTypes from "../actions/actionTypes";

const initialState = {
  districtsList: [],
  districts: [],
  districtMasterError: null
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DISTRICT_LIST:
      return {
        ...state,
        districtsList: action.districtList,
        districts: action.districts,
        districtMasterError: null
      };
    case actionTypes.LOG_DISTRICT_ERROR:
      return {
        ...state,
        districtMasterError: action.error
      };
    default:
      return state;
  }
};
export default districtReducer;
