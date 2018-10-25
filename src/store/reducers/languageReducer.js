import * as actionTypes from "../actions/actionTypes";

const initialState = {
  languagesList: [],
  stateMasterError: null
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_LANGUAGES:
    
      return {
        ...state,
        languagesList: action.languageList,
        stateMasterError: null,
      };
     case actionTypes.CREATE_LANGUAGE_SUCCESS:
      return {
        ...state,
         createLanguageError : false
      };
      case actionTypes.CREATE_LANGUAGE_FAIL:
      return {
        ...state,
         createLanguageError : true
      };
      case actionTypes.UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
         updateLanguageError : false
      };
      case actionTypes.UPDATE_LANGUAGE_FAIL:
      return {
        ...state,
         updateLanguageError : true
      };
    default:
      return state;
  }
};
export default languageReducer;
