import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeMediaContent = () => {
  return {
    type: actionTypes.GET_MEDIA
  };
};
export const storeAudioFiles = audios => {
  return {
    type: actionTypes.STORE_AUDIO_FILES,
    audioFiles: audios
  };
};
export const storeVideoFiles = videos => {
  return {
    type: actionTypes.STORE_VIDEO_FILES,
    videoFiles: videos
  };
};
export const storeImageFiles = images => {
  return {
    type: actionTypes.STORE_IMAGE_FILES,
    imageFiles: images
  };
};
export const postMediaContent = fileData => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/MediaContents/UploadVideo`, fileData)
      .then(response => {
        //console.log("Post Media response")
      })
      .catch(error => {});
  };
};
export const getAudioFiles = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Audios/GetAudios`)
      .then(response => {
        let audios = response.data.data.Audios;
        audios.forEach(audio => {
          audio.FilePath = `${AppConfig.serverURL}/${audio.FilePath}`;
        });
        dispatch(storeAudioFiles(audios));
      })
      .catch(error => {});
  };
};
export const getVideoFiles = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Videos/GetVideos`)
      .then(response => {
        let videos = response.data.data.Videos;
        videos.forEach(video => {
          video.FilePath = `${AppConfig.serverURL}/${video.FilePath}`;
        });
        dispatch(storeVideoFiles(videos));
      })
      .catch(error => {});
  };
};
export const getImageFiles = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Images/GetImages`)
      .then(response => {
        let images = response.data.data.Images;
        images.forEach(image => {
          image.FilePath = `${AppConfig.serverURL}/${image.FilePath}`;
        });
        dispatch(storeImageFiles(images));
      })
      .catch(error => {});
  };
};
