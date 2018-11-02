import * as actionTypes from "../actions/actionTypes";

const initialState = {
  audioFiles: [],
  videoFiles: [],
  imageFiles: []
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_AUDIO_FILES:
      return {
        ...state,
        audioFiles: action.audioFiles
      };
    case actionTypes.STORE_VIDEO_FILES:
      return {
        ...state,
        videoFiles: action.videoFiles
      };
    case actionTypes.STORE_IMAGE_FILES:
      return {
        ...state,
        imageFiles: action.imageFiles
      };
    default:
      return state;
  }
};
export default mediaReducer;
