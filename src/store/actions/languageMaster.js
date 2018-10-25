import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeLanguagesList = (languageList) => {
  return {
    type: actionTypes.GET_ALL_LANGUAGES,
    languageList: languageList
  };
};
// export const languageMasterError = (error) => {
//   return {
//     type : actionTypes.LOG_LANGUAGE_ERROR,
//     error : error
//   }
// }

export const getAllLanguages = () => {
  let languageList = [];
  let languages = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Languages/GetLanguages`)
      .then(response => {
        dispatch(storeLanguagesList(response.data.data.Languages));
      })
      .catch(error => {
       // dispatch(languageMasterError(error));
      });
  };
};

export const createLanguage = (language) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Languages/PostLanguage`, language)
      .then(response => {
        dispatch(createLanguageSuccess());
      })
      .catch(error => {
        dispatch(createLanguageFail(error));
      });
  };
}

export const createLanguageSuccess = () => {
  return {
    type : actionTypes.CREATE_LANGUAGE_SUCCESS
  }
}

export const createLanguageFail = () => {
  return {
    type : actionTypes.CREATE_LANGUAGE_FAIL
  }
}

// export const updateLanguage = (id ,language) => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Languages/PutLanguage?id=${id}`, language)
//       .then(response => {
//           //update success
//       })
//       .catch(error => {
//         dispatch(languageMasterError(error));
//       });
//   };
// }

// export const deleteLanguage = (id, language) => {
//   return dispatch => {
//     axios
//       .post(`${AppConfig.serverURL}/api/Languages/PutLanguage?id=${id}`, language)
//       .then(response => {
//           dispatch(getLanguagesList());
//       })
//       .catch(error => {
//         dispatch(languageMasterError(error));
//       });
//   };
// }
