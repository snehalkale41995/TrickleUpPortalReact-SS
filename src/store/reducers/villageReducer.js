import * as actionTypes from "../actions/actionTypes";

const initialState = {
  villagesList: [],
  villages: [],
  villageMasterError: null
};

const villageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VILLAGE_LIST:
      return {
        ...state,
        villagesList: action.villagesList,
        villages: action.villages,
        villageMasterError: null,
      };
    case actionTypes.LOG_VILLAGE_ERROR:
      return {
        ...state,
        villageMasterError : action.error
      };
    default:
      return state;
  }
};
export default villageReducer;
