import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeGrampanchayatList = (
  grampanchayatList,
  grampanchayats,
  inActiveGrampanchayat
) => {
  return {
    type: actionTypes.GET_GRAMPANCHAYAT_LIST,
    grampanchayatsList: grampanchayatList,
    grampanchayats: grampanchayats,
    inActiveGrampanchayat: inActiveGrampanchayat
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
  let inActiveGrampanchayat = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Grampanchayats/GetGrampanchayats`)
      .then(response => {
        if (response.data.success) {
          let Grampanchayat = _.filter(
            response.data.data.Grampanchayatdata,
            function(grampanchayat) {
              return grampanchayat.Active === true;
            }
          );
          inActiveGrampanchayat = _.filter(
            response.data.data.Grampanchayatdata,
            function(grampanchayat) {
              return grampanchayat.Active === false;
            }
          );
          Grampanchayat.forEach(grampanchayat => {
            if (grampanchayat.GrampanchayatName !== null) {
              grampanchayatList.push({
                label: grampanchayat.GrampanchayatName,
                value: grampanchayat.Id,
                districtId: grampanchayat.District,
                stateId: grampanchayat.State
              });
              grampanchayats.push(grampanchayat);
            }
          });
          dispatch(
            storeGrampanchayatList(
              grampanchayatList,
              grampanchayats,
              inActiveGrampanchayat
            )
          );
        } else {
          dispatch(grampanchayatMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error.response.data.error));
      });
  };
};

export const createGrampanchayat = grampanchayat => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Grampanchayats/PostGrampanchayat`,
        grampanchayat
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getGrampanchayatsList());
        } else {
          dispatch(grampanchayatMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error.response.data.error));
      });
  };
};
export const updateGrampanchayat = (id, grampanchayat) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Grampanchayats/PutGrampanchayat?id=${id}`,
        grampanchayat
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getGrampanchayatsList());
        } else {
          dispatch(grampanchayatMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error.response.data.error));
      });
  };
};
export const deleteGrampanchayat = (id, grampanchayat) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Grampanchayats/PutGrampanchayat?id=${id}`,
        grampanchayat
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getGrampanchayatsList());
        } else {
          dispatch(grampanchayatMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(grampanchayatMasterError(error.response.data.error));
      });
  };
};
