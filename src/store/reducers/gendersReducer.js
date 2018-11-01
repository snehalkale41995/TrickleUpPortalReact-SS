import * as actionTypes from "../actions/actionTypes";

const initialState = {
    gendersList : [],
    languagesList : [],
    genders :[],
    genderMasterError : null,
    inactiveGenders : []
};

const gendersReducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.GET_GENDERS:
      return {
        ...state,
        gendersList : action.gendersList,
        genders : action.genders,
        genderMasterError : null,
        inactiveGenders : action.inactiveGenders
      };
       case actionTypes.CREATE_GENDER_SUCCESS:
      return {
        ...state,
        genderMasterError : null
      };
      case actionTypes.UPDATE_GENDER_SUCCESS:
      return {
        ...state,
        genderMasterError : null
      };
     case actionTypes.LOG_GENDER_ERROR:
      return {
        ...state,
        genderMasterError : action.error
      };
    default:
      return state;
  }
};
export default gendersReducer;

