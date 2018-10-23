import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeBeneficiaryList = (beneficiaryList) => {
  return {
    type: actionTypes.GET_BENEFICIARY_LIST,
    beneficiaryList : beneficiaryList
  };
};
export const storeCurrentBeneficiary = (currentBeneficiary) => {
  return {
    type: actionTypes.STORE_CURRENT_BENEFICIARY,
    currentBeneficiary : currentBeneficiary
  };
}
export const logBeneficiaryError = (error) => {
  return {
    type: actionTypes.LOG_BENEFICIARY_ERROR,
    error : error
  };
}
export const getBeneficiaryList = () => {
let beneficiaryList = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Users/GetAllUsers`)
      .then(response => {
            beneficiaryList = response.data.data;
          beneficiaryList =  _.filter(beneficiaryList, function(beneficiary) {
              return beneficiary.Active === true ;
          });
            dispatch(storeBeneficiaryList(beneficiaryList));
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
};
export const getBeneficiaryById = (id) => {
  let currentBeneficiary = {};
    return dispatch => {
      axios
        .get(`${AppConfig.serverURL}/api/Users/GetUser/${id}`)
        .then(response => {
              let currentBeneficiary = response.data.data[0];
              currentBeneficiary.PhoneNumber = currentBeneficiary.PhoneNumber.toString();
              //console.log("currentBeneficiary", currentBeneficiary)
              dispatch(storeCurrentBeneficiary(currentBeneficiary));
        })
        .catch(error => {
          dispatch(logBeneficiaryError(error));
        });
    };
  };

export const createBeneficiary = (beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/PostUser`, beneficiary)
      .then(response => {
        let userCredentials = {
          UserName : beneficiary.PhoneNumber,
          Password: beneficiary.PhoneNumber,
          UserId : response.data.data.id
        };
        dispatch(postUserCredentials(userCredentials));
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
}

export const postUserCredentials = (user) => {
  return dispatch => {
    axios
    .post(`${AppConfig.serverURL}/api/UserCredentials/PostUserCredential`, user)
    .then(response => {
          console.log("Reposnoe userCredentials", response);
    })
    .catch(error => {
      dispatch(logBeneficiaryError(error));
    });
  }
}
export const updateBeneficiary = (id, beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/PutUser?id=${id}`, beneficiary)
      .then(response => {
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
}
export const deleteBeneficiary = (id, beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/PutUser?id=${id}`, beneficiary)
      .then(response => {
          dispatch(getBeneficiaryList());
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
}
export const bulkUploadBeneficiary = (beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/BulkUploadUser`, beneficiary)
      .then(response => {
         console.log("BULK Uplaod", response);
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
}

