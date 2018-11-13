import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeDistrictsList = (
  districtList,
  districts,
  inactiveDistrict
) => {
  return {
    type: actionTypes.GET_DISTRICT_LIST,
    districtList: districtList,
    districts: districts,
    inactiveDistrict: inactiveDistrict
  };
};
export const districtMasterError = error => {
  return {
    type: actionTypes.LOG_DISTRICT_ERROR,
    error: error
  };
};
export const getDistrictsList = () => {
  let districtList = [];
  let districts = [];
  let inactiveDistrict = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Districts/GetDistricts`)
      .then(response => {
        if (response.data.success) {
          let Districts = _.filter(response.data.data.Districts, function(
            district
          ) {
            return district.Active === true;
          });
          inactiveDistrict = _.filter(response.data.data.Districts, function(
            district
          ) {
            return district.Active === false;
          });
          Districts.forEach(district => {
            if (district.DistrictName !== null) {
              districtList.push({
                label: district.DistrictName,
                value: district.Id,
                stateId: district.State
              });
              districts.push(district);
            }
          });
          dispatch(
            storeDistrictsList(districtList, districts, inactiveDistrict)
          );
        } else {
          dispatch(districtMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(districtMasterError(error.response.data.error));
      });
  };
};

export const updateDistrict = (id, district) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Districts/PutDistrict?id=${id}`,
        district
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getDistrictsList());
        } else {
          dispatch(districtMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(districtMasterError(error.response.data.error));
      });
  };
};
export const createDistrict = district => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Districts/PostDistrict`, district)
      .then(response => {
        if (response.data.success) {
          dispatch(getDistrictsList());
        } else {
          dispatch(districtMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(districtMasterError(error.response.data.error));
      });
  };
};

export const deleteDistrict = (id, district) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Districts/PutDistrict?id=${id}`,
        district
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getDistrictsList());
        } else {
          dispatch(districtMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(districtMasterError(error.response.data.error));
      });
  };
};
