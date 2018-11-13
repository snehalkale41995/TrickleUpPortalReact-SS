import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeLanguagesList = (
  languages,
  languagesList,
  inactiveLanguages
) => {
  return {
    type: actionTypes.GET_LANGUAGES,
    languagesList: languagesList,
    languages: languages,
    inactiveLanguages: inactiveLanguages
  };
};

export const logLanguageMasterError = error => {
  return {
    type: actionTypes.LOG_LANGUAGE_ERROR,
    error: error
  };
};

export const createLanguageSuccess = () => {
  return {
    type: actionTypes.CREATE_LANGUAGE_SUCCESS
  };
};

export const updateLanguageSuccess = () => {
  return {
    type: actionTypes.UPDATE_LANGUAGE_SUCCESS
  };
};
export const getLanguageList = () => {
  let languageList = [];
  let languages = [];
  let inactiveLanguages = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Languages/GetLanguages`)
      .then(response => {
        if (response.data.success) {
          languages = _.filter(response.data.data.Languages, function(
            language
          ) {
            return language.Active === true;
          });
          inactiveLanguages = _.filter(response.data.data.Languages, function(
            language
          ) {
            return language.Active === false;
          });
          response.data.data.Languages.forEach(language => {
            if (language.LanguageName !== null && language.Active) {
              languageList.push({
                label: language.LanguageName,
                value: language.Id
              });
            }
          });
          dispatch(
            storeLanguagesList(languages, languageList, inactiveLanguages)
          );
        } else {
          dispatch(logLanguageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logLanguageMasterError(error.response.data.Message));
      });
  };
};

export const createLanguage = language => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Languages/PostLanguage`, language)
      .then(response => {
        if (response.data.success) {
          dispatch(getLanguageList());
          dispatch(createLanguageSuccess());
        } else {
          dispatch(logLanguageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logLanguageMasterError(error.response.data.Message));
      });
  };
};

export const updateLanguage = (id, language) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Languages/PutLanguage?id=${id}`,
        language
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getLanguageList());
          dispatch(updateLanguageSuccess());
        } else {
          dispatch(logLanguageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logLanguageMasterError(error.response.data.Message));
      });
  };
};

export const deleteLanguage = (id, language) => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/Languages/PutLanguage?id=${id}`,
        language
      )
      .then(response => {
        if (response.data.success) {
          dispatch(getLanguageList());
        } else {
          dispatch(logLanguageMasterError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logLanguageMasterError(error.response.data.Message));
      });
  };
};
