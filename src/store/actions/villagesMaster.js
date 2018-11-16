import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeVillagesList = (villageList, villages, inActiveVillages) => {
  return {
    type: actionTypes.GET_VILLAGE_LIST,
    villagesList: villageList,
    villages: villages,
    inActiveVillages: inActiveVillages
  };
};
export const logVillageMasterError = error => {
  return {
    type: actionTypes.LOG_VILLAGE_ERROR,
    error: error
  };
};

export const getVillagesList = () => {
  let villageList = [];
  let villages = [];
  let inActiveVillages = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Villages/GetVillages`)
      .then(response => {
        if (response.data.success) {
          let Villages = _.filter(response.data.data.Villagedata, function(
            village
          ) {
            return village.Active === true;
          });
          inActiveVillages = _.filter(response.data.data.Villagedata, function(
            village
          ) {
            return village.Active === false;
          });
          Villages.forEach(village => {
            if (village.VillageName !== null) {
              villageList.push({
                label: village.VillageName,
                value: village.Id,
                stateId: village.State,
                districtId: village.District,
                grampanchayatId: village.Grampanchayat
              });
              villages.push(village);
            }
          });
          dispatch(storeVillagesList(villageList, villages, inActiveVillages));
        } else {
          dispatch(logVillageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVillageMasterError("Something went wrong!"));
      });
  };
};

export const createVillage = village => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Villages/PostVillage`, village)
      .then(response => {
        if (response.data.success) {
          dispatch(getVillagesList());
        } else {
          dispatch(logVillageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVillageMasterError("Something went wrong!"));
      });
  };
};
export const updateVillage = (id, village) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Villages/PutVillage?id=${id}`, village)
      .then(response => {
        if (response.data.success) {
          dispatch(getVillagesList());
        } else {
          dispatch(logVillageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVillageMasterError("Something went wrong!"));
      });
  };
};
export const deleteVillage = (id, village) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Villages/PutVillage?id=${id}`, village)
      .then(response => {
        if (response.data.success) {
          dispatch(getVillagesList());
        } else {
          dispatch(logVillageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVillageMasterError("Something went wrong!"));
      });
  };
};
