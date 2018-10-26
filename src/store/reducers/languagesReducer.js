import * as actionTypes from "../actions/actionTypes";

const initialState = {
    languagesList : [],
    languages : [],
    languageMasterError : null
};

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.GET_LANGUAGES:
      return {
        ...state,
        languagesList : action.languagesList,
        languages : action.languages,
        languageMasterError : null
      };
       case actionTypes.CREATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        languageMasterError : null
      };
      case actionTypes.UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        languageMasterError : null
      };
     case actionTypes.LOG_LANGUAGE_ERROR:
      return {
        ...state,
        languageMasterError : action.error
      };
    default:
      return state;
  }
};
export default languagesReducer;

