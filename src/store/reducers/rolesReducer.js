import * as actionTypes from "../actions/actionTypes";

const initialState = {
    rolesList : [],
    roles:[],
    gendersList : [],
    languagesList : [],
    genders :[],
    languages : [],
    roleMasterError : null
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLES:
      return {
        ...state,
        rolesList : action.rolesList,
        roles : action.roles,
        roleMasterError : null
      };
      case actionTypes.GET_GENDERS:
      return {
        ...state,
        gendersList : action.gendersList,
        genders : action.genders,
        roleMasterError : null
      };
      case actionTypes.GET_LANGUAGES:
      return {
        ...state,
        languagesList : action.languagesList,
        languages : action.languages,
        roleMasterError : null
      };
       case actionTypes.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        roleMasterError : null
      };
      case actionTypes.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        roleMasterError : null
      };
     case actionTypes.LOG_ROLE_ERROR:
      return {
        ...state,
        roleMasterError : action.error
      };
    default:
      return state;
  }
};
export default rolesReducer;

