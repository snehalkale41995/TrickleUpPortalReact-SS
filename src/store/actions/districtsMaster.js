import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeDistrictsList = (districtList, districts) => {
  return {
    type: actionTypes.GET_DISTRICT_LIST,
    districtList: districtList,
    districts: districts
  };
};
export const districtMasterError = (error) => {
  return {
    type: actionTypes.LOG_DISTRICT_ERROR,
    error : error
  };
};
export const getDistrictsList = () => {
  let districtList = [];
  let districts = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Districts/GetDistricts`)
      .then(response => {
          response.data.data.Districts.forEach((district) => {
                if(district.DistrictName !== null){
                    districtList.push({label : district.DistrictName, value : district.Id});
                    districts.push(district);
                }
            });
            dispatch(storeDistrictsList(districtList, districts));
      })
      .catch(error => {
        dispatch(districtMasterError(error));
      });
  };
};

export const updateDistrict = (id, district) => {
  return dispatch => {
    axios
      .put(`${AppConfig.serverURL}/api/Districts/PutDistrict?id=${id}`, district)
      .then(response => {
      })
      .catch(error => {
        dispatch(districtMasterError(error));
      });
  };
};
export const createDistrict = (district) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Districts/PostDistrict`, district)
      .then(response => {
      })
      .catch(error => {
        dispatch(districtMasterError(error));
      });
  };
};
