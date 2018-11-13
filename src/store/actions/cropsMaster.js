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
};
export const storeCurrentCropStepAudioAllocation = audioAllocation => {
  return {
    type: actionTypes.STORE_CROP_STEP_AUDIO_ALLOCATION,
    audioAllocation: audioAllocation
  };
};

export const storeCurrentCropMaterialAudioAllocation = audioAllocation => {
  return {
    type: actionTypes.STORE_CROP_MATERIAL_AUDIO_ALLOCATION,
    audioAllocation: audioAllocation
  };
};
export const logCropError = error => {
  return {
    type: actionTypes.LOG_CROP_ERROR,
    cropError: error
  };
};
export const logCropStepError = error => {
  return {
    type: actionTypes.LOG_CROP_STEP_ERROR,
    cropStepError: error
  };
};
export const logCropMaterialError = error => {
  return {
    type: actionTypes.LOG_CROP_MATERIAL_ERROR,
    cropMaterialError: error
  };
};
export const getCropsList = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crops/GetCrops?langCode=26`)
      .then(response => {
        if (response.data.success) {
          let cropsList = response.data.data.Crops;
          dispatch(storeCropsList(cropsList));
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError(error));
      });
  };
};
export const getCropSteps = () => {
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/Cultivation_Steps/GetCultivation_StepsLan?langCode=26`
      )
      .then(response => {
        if (response.data.success) {
          let cropSteps = response.data.data.Cultivation_Steps;
          dispatch(storeCropSteps(cropSteps));
        } else {
          dispatch(logCropStepError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropStepError(error));
      });
  };
};

export const getCropStepsMaterial = () => {
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/CropSteps_Material/GetCropSteps_Material?langCode=26`
      )
      .then(response => {
        if (response.data.success) {
          dispatch(
            storeCropStepMaterials(response.data.data.CropSteps_Material)
          );
        } else {
          dispatch(logCropMaterialError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropMaterialError(error));
      });
  };
};
export const getCropCultivationSteps = id => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crops/GetCropStepMaterialData?id=${id}`)
      .then(response => {
        if (response.data.success) {
          dispatch(storeCurrentCrop(response.data.data));
        } else {
          dispatch(logCropStepError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropStepError(error));
      });
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
export const getCropAudioAllocation = cropId => {
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/Crop_AudioAllocation/Get_CropAudioAllocation?CropId=${cropId}`
      )
      .then(response => {
        if (response.data.success) {
          let audioAllocation = response.data.data.AudioAllocation;
          audioAllocation.forEach(audio => {
            audio.FilePath = `${AppConfig.serverURL}/${audio.FilePath}`;
          });
          dispatch(storeCurrentCropAudioAllocation(audioAllocation));
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError(error));
      });
  };
};
export const getCropStepsAudioAllocation = stepId => {
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/CropStepAudio_Allocation/GetStep_Audio?StepId=${stepId}`
      )
      .then(response => {
        if (response.data.success) {
          let audioAllocation = response.data.data.AudioAllocation;
          audioAllocation.forEach(audio => {
            audio.FilePath = `${AppConfig.serverURL}/${audio.FilePath}`;
          });
          dispatch(storeCurrentCropStepAudioAllocation(audioAllocation));
        } else {
          dispatch(logCropStepError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropStepError(error));
      });
  };
};
export const getCropMaterialAudioAllocation = materialId => {
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/CropMaterial_AudioAllocation/GetCropMaterial_Audio?MaterialId=${materialId}`
      )
      .then(response => {
        if (response.data.success) {
          let audioAllocation = response.data.data.AudioAllocation;
          audioAllocation.forEach(audio => {
            audio.FilePath = `${AppConfig.serverURL}/${audio.FilePath}`;
          });
          dispatch(storeCurrentCropMaterialAudioAllocation(audioAllocation));
        } else {
          dispatch(logCropMaterialError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropMaterialError(error));
      });
  };
};
