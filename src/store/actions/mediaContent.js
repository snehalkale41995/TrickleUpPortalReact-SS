import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeMediaContent = () => {
  return {
    type: actionTypes.GET_MEDIA
  };
};
export const storeAudioFiles = (audios, audioOptions) => {
  return {
    type: actionTypes.STORE_AUDIO_FILES,
    audioFiles: audios,
    audioOptions: audioOptions
  };
};
export const storeVideoFiles = videos => {
  return {
    type: actionTypes.STORE_VIDEO_FILES,
    videoFiles: videos
  };
};
export const storeImageFiles = (images, imageOptions) => {
  return {
    type: actionTypes.STORE_IMAGE_FILES,
    imageFiles: images,
    imageOptions: imageOptions
  };
};
export const logAudioError = error => {
  return {
    type: actionTypes.LOG_AUDIO_ERROR,
    error: error
  };
};
export const logVideoError = error => {
  return {
    type: actionTypes.LOG_VIDEO_ERROR,
    error: error
  };
};
export const logImageError = error => {
  return {
    type: actionTypes.LOG_IMAGE_ERROR,
    error: error
  };
};

export const getAudioFiles = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Audios/GetAudios`)
      .then(response => {
        if (response.data.success) {
          let audios = _.filter(response.data.data.Audios, {Active : true});
          let audioOptions = [];
          audios.forEach(audio => {
            audio.FilePath = `${AppConfig.serverURL}/${audio.FilePath}`;
            audioOptions.push({ label: audio.FileName, value: audio.Id });
          });
          dispatch(storeAudioFiles(audios, audioOptions));
        } else {
          dispatch(logAudioError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logAudioError("Something went wrong!"));
      });
  };
};

export const postAudioFile = audio => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/FileUpload/PostAudios`, audio)
      .then(response => {
        if (response.data.success) {
          dispatch(getAudioFiles());
        } else {
          dispatch(logAudioError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logAudioError("Something went wrong!"));
      });
  };
};
export const deleteAudioFile = (audioId, audio) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Audios/DeactiveAudio?id=${audioId}`,audio)
      .then(response => {
        if (response.data.success) {
          dispatch(getAudioFiles());
        } else {
          dispatch(logAudioError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logAudioError("Something went wrong!"));
      });
  };
};
export const getVideoFiles = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Videos/GetVideos`)
      .then(response => {
        if (response.data.success) {
          
          let videos = _.filter(response.data.data.Videos, {Active : true});
          videos.forEach(video => {
            video.FilePath = `${AppConfig.serverURL}/${video.FilePath}`;
          });
          dispatch(storeVideoFiles(videos));
        } else {
          dispatch(logVideoError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVideoError("Something went wrong!"));
      });
  };
};
export const postVideoFile = video => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/FileUpload/PostVideos`, video)
      .then(response => {
        if (response.data.success) {
          dispatch(getVideoFiles());
        } else {
          dispatch(logVideoError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVideoError("Something went wrong!"));
      });
  };
};
export const deleteVideoFile = (id,video) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Videos/DeactiveVideo?id=${id}`, video)
      .then(response => {
        if (response.data.success) {
          dispatch(getVideoFiles());
        } else {
          dispatch(logVideoError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logVideoError("Something went wrong!"));
      });
  };
};
export const getImageFiles = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Images/GetImages`)
      .then(response => {
        if (response.data.success) {
          let images =  _.filter(response.data.data.Images, {Active : true});
          let imageOptions = [];
          images.forEach(image => {
            imageOptions.push({
              label: image.ImageName,
              value: image.Id,
              FilePath: image.FilePath
            });
            image.FilePath = `${AppConfig.serverURL}/${image.FilePath}`;
          });
          dispatch(storeImageFiles(images, imageOptions));
        } else {
          dispatch(logImageError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logImageError("Something went wrong!"));
      });
  };
};
export const postImageFile = image => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/FileUpload/PostImages`, image)
      .then(response => {
        if (response.data.success) {
          dispatch(getImageFiles());
        } else {
          dispatch(logImageError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logImageError("Something went wrong!"));
      });
  };
};
export const deleteImageFile = (id, image) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Images/PutImage?id=${id}`, image)
      .then(response => {
        if (response.data.success) {
          dispatch(getImageFiles());
        } else {
          dispatch(logImageError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logImageError("Something went wrong!"));
      });
  };
};
