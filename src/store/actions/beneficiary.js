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
export const storeBulkUploadHistory = (bulkUploadHistory) => {
  return {
    type: actionTypes.STORE_BULK_UPLOAD_HISTORY,
    bulkUploadHistory : bulkUploadHistory
  };
}
export const logBeneficiaryError = (error) => {
  return {
    type: actionTypes.LOG_BENEFICIARY_ERROR,
    error : error
  };
}

export const clearBeneficiaryError = () => {
  return {
    type: actionTypes.CLEAR_BENEFICIARY_ERROR
  };
}

export const ValidateBulkDataError = (bulkUserData) => {
  return {
    type: actionTypes.VALIDATE_BULKDATA_ERROR,
    bulkUserData : bulkUserData
  };
}

export const ValidateBulkDataSuccess = () => {
  return {
    type: actionTypes.VALIDATE_BULKDATA_SUCCESS
  };
}

export const getBeneficiaryList = () => {
let beneficiaryList = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Users/GetAllUsers`)
      .then(response => {
            beneficiaryList = response.data.data;
            dispatch(storeBeneficiaryList(beneficiaryList));
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
};

export const getOperationalUserList = () => {
let beneficiaryList = [];
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Users/GetAllUsers`)
      .then(response => {
            beneficiaryList = response.data.data;
            beneficiaryList =  _.filter(beneficiaryList, function(beneficiary) {
             return beneficiary.Active === true && beneficiary.Role === 2 ;
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
              let currentBeneficiary = response.data.data.Users[0];
              currentBeneficiary.PhoneNumber = currentBeneficiary.PhoneNumber.toString();
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
          UserName : beneficiary.PhoneNumber, //addd userName [email]
          Password: beneficiary.PhoneNumber,
          UserId : response.data.data.id,
          PhoneNumber : beneficiary.PhoneNumber
        };
        dispatch(postUserCredentials(userCredentials));
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.error));
      });
  };
}

export const postUserCredentials = (user) => {
  return dispatch => {
    axios
    .post(`${AppConfig.serverURL}/api/UserCredentials/PostUserCredential`, user)
    .then(response => {
          //console.log("Reposnoe userCredentials", response);
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
         dispatch(clearBeneficiaryError());
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
}

export const bulkValidateBeneficiary = (beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/ValidateUploadUser`, beneficiary)
      .then(response => {
      
        if(!response.data.success)
         dispatch(ValidateBulkDataError(response.data.data.userList))
        else
         dispatch(ValidateBulkDataSuccess())
      })
      .catch(error => {
      //  dispatch(logBeneficiaryError(error));
      });
  };
}


export const getBulkUploadHistory = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/BulkUploadRefs/GetBulkUploadRefs`)
      .then(response => {
        if(response.data.success){
          let bulkUploadHistory  = response.data.data.BulkUpload;
          bulkUploadHistory.forEach((record) => {
            record.CreatedOn = record.CreatedOn.slice(0,10);
          })
          dispatch(storeBulkUploadHistory(bulkUploadHistory));
        }else{
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error));
      });
  };
} 

