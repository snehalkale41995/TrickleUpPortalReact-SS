import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeCropsList = (cropsList) => {
  return {
    type: actionTypes.GET_CROPS,
    cropsList :cropsList
  };
};
export const getCropsList = () => {
  let cropsList = [];
  
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crops/GetCrops`)
      .then(response => {
          cropsList = response.data.data.Crops;
          dispatch(storeCropsList(cropsList));
      })
      .catch(error => {});
  };
};
