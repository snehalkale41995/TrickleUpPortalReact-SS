import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeMediaContent = () => {
  return {
    type: actionTypes.GET_MEDIA
  };
};
export const postMediaContent = (fileData) => {

  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/MediaContents/UploadVideo`, fileData)
      .then(response => {
          console.log("Post Media response")
        //   response.data.forEach((district) => {
        //         if(district.DistrictName !== null){
        //             districtList.push({label : district.DistrictName, value : district.Id});
        //             districts.push(district);
        //         }
        //     });
        //     dispatch(storeDistrictsList(districtList, districts));
      })
      .catch(error => {});
  };
};
