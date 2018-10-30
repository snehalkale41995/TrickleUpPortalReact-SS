import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";

export const storeLanguagesList = (languages, languagesList) => {
  return {
    type: actionTypes.GET_LANGUAGES,
    languagesList: languagesList,
    languages : languages
  };
}

export const getLanguageList = () => {
  let languageList = [];
  let languages = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Languages/GetLanguages`)
      .then(response => {
        response.data.data.Languages.forEach(language => {
          if (language.LanguageName !== null && language.Active) {
            languageList.push({ label: language.LanguageName, value: language.Id });
            languages.push(language);
          }
        });
        dispatch(storeLanguagesList(languages, languageList));
      })
      .catch(error => {});
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
        dispatch(genderMasterError(error));
      });
  };
}

export const updateLanguage = (id ,language) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Languages/PutLanguage?id=${id}`, language)
      .then(response => {
         dispatch(updateLanguageSuccess());
      })
      .catch(error => {
        dispatch(genderMasterError(error));
      });
  };
}

export const deleteLanguage = (id, language) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Languages/PutLanguage?id=${id}`, language)
      .then(response => {
          dispatch(getLanguageList());
      })
      .catch(error => {
         dispatch(genderMasterError(error));
      });
  };
}

export const genderMasterError = (error) => {
  return {
    type : actionTypes.LOG_LANGUAGE_ERROR,
    error : error
  }
}

export const createLanguageSuccess= () =>{
  return {
    type : actionTypes.CREATE_LANGUAGE_SUCCESS
  }
}

export const updateLanguageSuccess= () =>{
  return {
    type : actionTypes.UPDATE_LANGUAGE_SUCCESS
  }
}

