import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeGrampanchayatList = (grampanchayatList, grampanchayats) => {
  return {
    type: actionTypes.GET_GRAMPANCHAYAT_LIST,
    grampanchayatsList: grampanchayatList,
    grampanchayats: grampanchayats
  };
};
export const grampanchayatMasterError = error => {
  return {
    type: actionTypes.LOG_GRAMPANCHAYAT_ERROR,
    error: error
  };
};

export const getGrampanchayatsList = () => {
  let grampanchayatList = [];
  let grampanchayats = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Grampanchayats/GetGrampanchayats`)
      .then(response => {
        let Grampanchayat = _.filter(
          response.data.data.Grampanchayatdata,
          function(grampanchayat) {
            return grampanchayat.Active === true;
          }
        );
        Grampanchayat.forEach(grampanchayat => {
          if (grampanchayat.GrampanchayatName !== null) {
            grampanchayatList.push({
              label: grampanchayat.GrampanchayatName,
              value: grampanchayat.Id,
              districtId: grampanchayat.District,
              stateId : grampanchayat.State
            });
            grampanchayats.push(grampanchayat);
          }
        });
        dispatch(storeGrampanchayatList(grampanchayatList, grampanchayats));
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error));
      });
  };
};

export const createGrampanchayat = (grampanchayat) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Grampanchayats/PostGrampanchayat`, grampanchayat)
      .then(response => {
          //console.log("Post /api/Grampanchayats/PostGrampanchayat", response);
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error));
      });
  };
}
export const updateGrampanchayat = (id ,grampanchayat) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Grampanchayats/PutGrampanchayat?id=${id}`, grampanchayat)
      .then(response => {
        console.log("Post /api/Grampanchayats/PutGrampanchayat", response);
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error));
      });
  };
}
//delete pending
// export const deleteVillage = (id) => {
//   return dispatch => {
//     axios
//       .delete(`${AppConfig.serverURL}/api/Grampanchayat/PutVillage?id=${id}`)
//       .then(response => {
//           //delete success
//       })
//       .catch(error => {
//         dispatch(grampanchayatMasterError(error));
//       });
//   };
// }
