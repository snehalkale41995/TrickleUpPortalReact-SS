import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeStatesList = (stateList, states) => {
  return {
    type: actionTypes.GET_STATES_LIST,
    stateList: stateList,
    states: states
  };
};
export const stateMasterError = (error) => {
  return {
    type : actionTypes.LOG_STATE_ERROR,
    error : error
  }
}

export const getStatesList = () => {
  let stateList = [];
  let states = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/States/GetStates`)
      .then(response => {
        let StateData = _.filter( response.data.data.States, function(state) {
          return state.Active === true ;
      });
      StateData.forEach(state => {
          if (state.StateName !== null) {
            stateList.push({ label: state.StateName, value: state.Id });
            states.push(state);
          }
        });
        dispatch(storeStatesList(stateList, states));
      })
      .catch(error => {
        dispatch(stateMasterError(error));
      });
  };
};

export const createState = (state) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/States/PostState`, state)
      .then(response => {
          //create success
      })
      .catch(error => {
        dispatch(stateMasterError(error));
      });
  };
}
export const updateState = (id ,state) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/States/PutState?id=${id}`, state)
      .then(response => {
          //update success
      })
      .catch(error => {
        dispatch(stateMasterError(error));
      });
  };
}

export const deleteState = (id, state) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/States/PutState?id=${id}`, state)
      .then(response => {
          dispatch(getStatesList());
      })
      .catch(error => {
        dispatch(stateMasterError(error));
      });
  };
}
