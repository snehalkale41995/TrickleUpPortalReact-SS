import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeVillagesList = (villageList, villages) => {
  return {
    type: actionTypes.GET_VILLAGE_LIST,
    villagesList: villageList,
    villages: villages
  };
};
export const villageMasterError = error => {
  return {
    type: actionTypes.LOG_VILLAGE_ERROR,
    error: error
  };
};

export const getVillagesList = () => {
  let villageList = [];
  let villages = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Villages/GetVillages`)
      .then(response => {
        let Villages = _.filter(response.data.data.Villagedata, function(
          village
        ) {
          return village.Active === true;
        });
        Villages.forEach(village => {
          if (village.VillageName !== null) {
            villageList.push({
              label: village.VillageName,
              value: village.Id,
              stateId: village.State,
              districtId: village.District,
              grampanchayatId : village.Grampanchayat
            });
            villages.push(village);
          }
        });
        dispatch(storeVillagesList(villageList, villages));
      })
      .catch(error => {
        dispatch(villageMasterError(error));
      });
  };
};

// export const createVillage = (village) => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Villages/PostVillage`, village)
//       .then(response => {
//           //create success
//       })
//       .catch(error => {
//         dispatch(villageMasterError(error));
//       });
//   };
// }
// export const updateVillage = (id ,village) => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Villages/PutVillage?id=${id}`, village)
//       .then(response => {
//           //update success
//       })
//       .catch(error => {
//         dispatch(villageMasterError(error));
//       });
//   };
// }
//delete pending
// export const deleteVillage = (id) => {
//   return dispatch => {
//     axios
//       .delete(`${AppConfig.serverURL}/api/Villages/PutVillage?id=${id}`)
//       .then(response => {
//           //delete success
//       })
//       .catch(error => {
//         dispatch(villageMasterError(error));
//       });
//   };
// }
