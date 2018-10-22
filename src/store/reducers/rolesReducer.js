import * as actionTypes from "../actions/actionTypes";

const initialState = {
    rolesList : [],
    roles:[],
    gendersList : [],
    languagesList : [],
    genders :[],
    languages : []
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
    default:
      return state;
  }
};
export default rolesReducer;

