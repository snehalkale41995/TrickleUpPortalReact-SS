import * as actionTypes from "../actions/actionTypes";

const initialState = {
  statesList: [],
  states: [],
  inactiveStates : [],
  stateMasterError: null
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STATES_LIST:
      return {
        ...state,
        statesList: action.stateList,
        states: action.states,
        stateMasterError: null,
        inactiveStates : action.inactiveStates
      };
    case actionTypes.LOG_STATE_ERROR:
      return {
        ...state,
        stateMasterError : action.error
      };
    default:
      return state;
  }
};
export default stateReducer;
