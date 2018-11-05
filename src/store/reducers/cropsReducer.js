import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cropsList: [],
  currentCropData: {},
  cropSteps: [],
  cropStepsMaterial: [],
  currentCropAudioAllocation: []
};

const cropsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CROPS:
      return {
        ...state,
        cropsList: action.cropsList
      };
    case actionTypes.GET_CURRENT_CROP_DATA:
      return {
        ...state,
        currentCropData: action.currentCropData
      };
    case actionTypes.GET_CROPS_STEPS:
      return {
        ...state,
        cropSteps: action.cropSteps
      };
    case actionTypes.GET_CROPS_STEPS_MATERIAL:
      return {
        ...state,
        cropStepsMaterial: action.cropStepsMaterial
      };
    case actionTypes.STORE_CROP_AUDIO_ALLOCATION:
      return {
        ...state,
        currentCropAudioAllocation: action.audioAllocation
      };
    default:
      return state;
  }
};
export default cropsReducer;
