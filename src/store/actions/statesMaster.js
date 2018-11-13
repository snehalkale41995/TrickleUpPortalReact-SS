import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeStatesList = (stateList, states, inactiveStates) => {
  return {
    type: actionTypes.GET_STATES_LIST,
    stateList: stateList,
    states: states,
    inactiveStates: inactiveStates
  };
};
export const logStateMasterError = error => {
  return {
    type: actionTypes.LOG_STATE_ERROR,
    error: error
  };
};

export const getStatesList = () => {
  let stateList = [];
  let states = [];
  let inactiveStates = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/States/GetStates`)
      .then(response => {
        if (response.data.success) {
          let StateData = _.filter(response.data.data.States, function(state) {
            return state.Active === true;
          });
          inactiveStates = _.filter(response.data.data.States, function(state) {
            return state.Active === false;
          });
          StateData.forEach(state => {
            if (state.StateName !== null) {
              stateList.push({ label: state.StateName, value: state.Id });
              states.push(state);
            }
          });
          dispatch(storeStatesList(stateList, states, inactiveStates));
        } else {
          dispatch(logStateMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logStateMasterError(error.response.data.Message));
      });
  };
};

export const createState = state => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/States/PostState`, state)
      .then(response => {
        if (response.data.success) {
          dispatch(getStatesList());
        } else {
          dispatch(logStateMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logStateMasterError(error.response.data.Message));
      });
  };
};
export const updateState = (id, state) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/States/PutState?id=${id}`, state)
      .then(response => {
        if (response.data.success) {
          dispatch(getStatesList());
        } else {
          dispatch(logStateMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logStateMasterError(error.response.data.Message));
      });
  };
};

export const deleteState = (id, state) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/States/PutState?id=${id}`, state)
      .then(response => {
        if (response.data.success) {
          dispatch(getStatesList());
        } else {
          dispatch(logStateMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logStateMasterError(error.response.data.Message));
      });
  };
};
