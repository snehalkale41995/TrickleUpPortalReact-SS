import * as actionTypes from "../actions/actionTypes";

const initialState = {
  audioFiles: [],
  audioOptions: [],
  videoFiles: [],
  imageFiles: [],
  imageOptions: [],
  audioError: null,
  videoError: null,
  imageError: null
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_AUDIO_FILES:
      return {
        ...state,
        audioFiles: action.audioFiles,
        audioOptions : action.audioOptions,
        audioError: null
      };
    case actionTypes.STORE_VIDEO_FILES:
      return {
        ...state,
        videoFiles: action.videoFiles,
        videoError: null
      };
    case actionTypes.STORE_IMAGE_FILES:
      return {
        ...state,
        imageError: null,
        imageFiles: action.imageFiles,
        imageOptions: action.imageOptions
      };
    case actionTypes.LOG_AUDIO_ERROR:
      return {
        ...state,
        audioError: action.error
      };
    case actionTypes.LOG_IMAGE_ERROR:
      return {
        ...state,
        imageError: action.error
      };
    case actionTypes.LOG_VIDEO_ERROR:
      return {
        ...state,
        videoError: action.error
      };
    default:
      return state;
  }
};
export default mediaReducer;
