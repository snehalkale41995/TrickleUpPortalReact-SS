import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeCropsList = cropsList => {
  return {
    type: actionTypes.GET_CROPS,
    cropsList: cropsList
  };
};
export const storeCurrentCrop = cropData => {
  return {
    type: actionTypes.GET_CURRENT_CROP_DATA,
    currentCropData: cropData
  };
};
export const storeCropSteps = cropSteps => {
  return {
    type: actionTypes.GET_CROPS_STEPS,
    cropSteps: cropSteps
  };
};
export const storeCropStepMaterials = cropStepsMaterial => {
  return {
    type: actionTypes.GET_CROPS_STEPS_MATERIAL,
    cropStepsMaterial: cropStepsMaterial
  };
};
export const storeCurrentCropAudioAllocation = audioAllocation => {
  return {
    type: actionTypes.STORE_CROP_AUDIO_ALLOCATION,
    audioAllocation: audioAllocation
  };
}
export const getCropsList = () => {
  let cropsList = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crops/GetCrops?langCode=26`)
      .then(response => {
        cropsList = response.data.data.Crops;
        dispatch(storeCropsList(cropsList));
      })
      .catch(error => {});
  };
};
export const getCropSteps = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Cultivation_Steps/GetCultivation_Steps`)
      .then(response => {
        let cropSteps = response.data.data.Cultivation_Steps;
        dispatch(storeCropSteps(cropSteps));
      })
      .catch(error => {});
  };
};

export const getCropStepsMaterial = () => {
  let cropCultivationSteps = {};
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/CropSteps_Material/GetCropSteps_Material`
      )
      .then(response => {
        dispatch(storeCropStepMaterials(response.data.data.CropSteps_Material));
      })
      .catch(error => {});
  };
};
export const getCropCultivationSteps = id => {
  let cropCultivationSteps = {};
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crops/GetCropStepMaterialData?id=${id}`)
      .then(response => {
        dispatch(storeCurrentCrop(response.data.data));
      })
      .catch(error => {});
  };
};
export const storeCropImage = Files => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/FileUpload/PostVideos`, Files)
      .then(response => {
        //console.log("Post Image Resopnse", response);
      })
      .catch(error => {
       // console.log("Post Image error", error);
      });
  };
};
export const getCropAudioAllocation = id => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crop_AudioAllocation/Get_CropAudioAllocation?CropId=${id}`)
      .then(response => {
          let audioAllocation = response.data.data.AudioAllocation;
          audioAllocation.forEach((audio) => {
            audio.FilePath = `${AppConfig.serverURL}/${audio.FilePath}`;
          })
          dispatch(storeCurrentCropAudioAllocation(audioAllocation));
      })
      .catch(error => {
        console.log("getCropAudioAllocation werrr", error);
      });
  };
};
