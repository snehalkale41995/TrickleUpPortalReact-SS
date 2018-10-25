import * as actionTypes from "../actions/actionTypes";

const initialState = {
    rolesList : [],
    roles:[],
    gendersList : [],
    languagesList : [],
    genders :[],
    languages : [],
    createRoleError : false,
    updateRoleError : false
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLES:
      return {
        ...state,
        rolesList : action.rolesList,
        roles : action.roles
      };
      case actionTypes.GET_GENDERS:
      return {
        ...state,
        gendersList : action.gendersList,
        genders : action.genders
      };
      case actionTypes.GET_LANGUAGES:
      return {
        ...state,
        languagesList : action.languagesList,
        languages : action.languages
      };
      case actionTypes.CREATE_ROLE_SUCCESS:
      return {
        ...state,
         createRoleError : false
      };
      case actionTypes.CREATE_ROLE_FAIL:
      return {
        ...state,
         createRoleError : true
      };
      case actionTypes.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
         updateRoleError : false
      };
      case actionTypes.UPDATE_ROLE_FAIL:
      return {
        ...state,
         updateRoleError : true
      };

    default:
      return state;
  }
};
export default rolesReducer;

