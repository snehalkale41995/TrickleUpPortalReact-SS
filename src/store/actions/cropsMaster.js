import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const catchUncaughtException = exception => {
  return {
    type: actionTypes.CATCH_UNCAUGHT_EXCEPTION,
    exception: exception
  };
};
export const clearUncaughtException = () => {
  return {
    type: actionTypes.CLEAR_UNCAUGHT_EXCEPTION
  };
};
export const storeCropsList = (activeCrops, inActiveCrops, cropList) => {
  return {
    type: actionTypes.GET_CROPS,
    cropsList: cropList,
    activeCrops: activeCrops,
    inActiveCrops: inActiveCrops
  };
};
export const storeCurrentCrop = cropData => {
  return {
    type: actionTypes.GET_CURRENT_CROP_DATA,
    currentCropData: cropData
  };
};
export const storeCropSteps = (cropSteps ,cropStepList) => {
  return {
    type: actionTypes.GET_CROPS_STEPS,
    cropSteps: cropSteps,
    cropStepList : cropStepList
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
export const clearAudioAllocations = () => {
  return {
    type: actionTypes.CLEAR_AUDIO_ALLOCATIONS
  };
};
/**---------------------------CROP FUNCTIONS ---------------------------*/
export const getCropsList = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Crops/GetCropsPortal?langCode=26`)
      .then(response => {
        if (response.data.success) {
          let activeCrops = _.filter(response.data.data.Crops, function(crop) {
            return crop.Ready === true;
          });
          let inActiveCrops = _.filter(response.data.data.Crops, function(
            crop
          ) {
            return crop.Ready === false;
          });
          let cropList = [];
          activeCrops.forEach(crop => {
            if (crop.CropName !== null) {
              cropList.push({
                label: crop.CropName,
                value: crop.Id
              });
            }
          });
          dispatch(storeCropsList(activeCrops, inActiveCrops, cropList));
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
export const createCrop = crop => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Crops/PostCrop`, crop)
      .then(response => {
        if (response.data.success) {
          dispatch(getCropsList());
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
export const updateCrop = (id, crop) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Crops/PutCrop?id=${id}`, crop)
      .then(response => {
        if (response.data.success) {
          dispatch(getCropsList());
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
export const deactivateCrop = (id, crop) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Crops/PutCrop?id=${id}`, crop)
      .then(response => {
        if (response.data.success) {
          dispatch(getCropsList());
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
/**---------------------------CROP STEP FUNCTIONS ---------------------------*/
export const getCropSteps = () => {
  return dispatch => {
    axios
      .get(
        `${AppConfig.serverURL}/api/Cultivation_Steps/GetCultivation_StepsLan?langCode=26`
      )
      .then(response => {
        if (response.data.success) {
          let cropSteps = response.data.data.Cultivation_Steps;
          let cropStepList = [];
          cropSteps.forEach((step => {
            cropStepList.push({label : step.Step_Name , value : step.Id});
          }))
          dispatch(storeCropSteps(cropSteps,cropStepList));
        } else {
          dispatch(logCropStepError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropStepError("Something went wrong!"));
      });
  };
};
export const createCropStep = cropStep => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Cultivation_Steps/PostCultivation_Steps`,
        cropStep
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getCropSteps());
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
export const updateCropStep = (id, cropStep) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Cultivation_Steps/PutCultivation_Steps?id=${id}`,
        cropStep
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getCropSteps());
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
export const deleteCropStep = (id, cropStep) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Cultivation_Steps/PutCultivation_Steps?id=${id}`,
        cropStep
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getCropSteps());
        } else {
          dispatch(logCropError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
/**---------------------------CROP MATERIAL FUNCTIONS ---------------------------*/
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
        dispatch(logCropMaterialError("Something went wrong!"));
      });
  };
};

export const createCropMaterial = cropMaterial => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/CropSteps_Material/PostCropSteps_Material`,
        cropMaterial
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getCropStepsMaterial());
        } else {
          dispatch(logCropMaterialError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropMaterialError("Something went wrong!"));
      });
  };
};

export const updateCropMaterial = (id, cropMaterial) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/CropSteps_Material/PutCropSteps_Material?Id=${id}`,
        cropMaterial
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getCropStepsMaterial());
        } else {
          dispatch(logCropMaterialError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropMaterialError("Something went wrong!"));
      });
  };
};
export const deleteCropMaterial = (id, cropMaterial) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/CropSteps_Material/PutCropSteps_Material?Id=${id}`,
        cropMaterial
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getCropStepsMaterial());
        } else {
          dispatch(logCropMaterialError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logCropMaterialError("Something went wrong!"));
      });
  };
};
/**---------------------------CROP CULTIVATIONS FUNCTIONS ---------------------------*/

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
        dispatch(logCropStepError("Something went wrong!"));
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

/**---------------------------CROP AUDIO ALLOCATIONS FUNCTIONS ---------------------------*/

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
        dispatch(logCropError("Something went wrong!"));
      });
  };
};
/**---------------------------CROP STEP AUDIO ALLOCATIONS FUNCTIONS ---------------------------*/

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
        dispatch(logCropStepError("Something went wrong!"));
      });
  };
};

/**---------------------------CROP MATERIAL AUDIO ALLOCATIONS FUNCTIONS ---------------------------*/

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
        dispatch(logCropMaterialError("Something went wrong!"));
      });
  };
};
