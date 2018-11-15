import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cropsList: [],
  currentCropData: {},
  cropSteps: [],
  cropStepsMaterial: [],
  currentCropAudioAllocation: [],
  currentCropStepAudioAllocation: [],
  currentCropMaterialAudioAllocation: [],
  cropError: null,
  cropStepError: null,
  cropMaterialError: null
};

const cropsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CROPS:
      return {
        ...state,
        cropsList: action.cropsList,
        cropError: null,
        currentCropAudioAllocation: []
      };
    case actionTypes.GET_CURRENT_CROP_DATA:
      return {
        ...state,
        currentCropData: action.currentCropData,
        cropError: null
      };
    case actionTypes.STORE_CROP_AUDIO_ALLOCATION:
      return {
        ...state,
        currentCropAudioAllocation: action.audioAllocation,
        cropError: null
      };
    //add crop error case
    case actionTypes.LOG_CROP_ERROR:
      return {
        ...state,
        cropError: action.cropError,
        currentCropAudioAllocation: []
      };
    case actionTypes.GET_CROPS_STEPS:
      return {
        ...state,
        cropSteps: action.cropSteps,
        currentCropStepAudioAllocation: [],
        cropStepError: null
      };
    case actionTypes.STORE_CROP_STEP_AUDIO_ALLOCATION:
      return {
        ...state,
        currentCropStepAudioAllocation: action.audioAllocation,
        cropStepError: null
      };
    //add crop step error case
    case actionTypes.LOG_CROP_STEP_ERROR:
      return {
        ...state,
        cropStepError: action.cropStepError,
        currentCropStepAudioAllocation: []
      };
    case actionTypes.GET_CROPS_STEPS_MATERIAL:
      return {
        ...state,
        cropStepsMaterial: action.cropStepsMaterial,
        currentCropMaterialAudioAllocation: [],
        cropMaterialError: null
      };
    case actionTypes.STORE_CROP_MATERIAL_AUDIO_ALLOCATION:
      return {
        ...state,
        currentCropMaterialAudioAllocation: action.audioAllocation,
        cropMaterialError: null
      };
    //add crop maetrial error case
    case actionTypes.LOG_CROP_MATERIAL_ERROR:
      return {
        ...state,
        currentCropMaterialAudioAllocation: [],
        cropMaterialError: action.cropMaterialError
      };
      case actionTypes.CLEAR_AUDIO_ALLOCATIONS:
      return {
        ...state,
        currentCropAudioAllocation: [],
        currentCropStepAudioAllocation: [],
        currentCropMaterialAudioAllocation: [],
      };
    default:
      return state;
  }
};
export default cropsReducer;
