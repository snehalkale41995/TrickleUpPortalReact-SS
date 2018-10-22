import * as actionTypes from "../actions/actionTypes";

const initialState = {
    cropsList : []
};

const cropsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CROPS:
      return {
        ...state,
      cropsList : action.cropsList
      };
    default:
      return state;
  }
};
export default cropsReducer;

