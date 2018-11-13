import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const storeBeneficiaryList = (
  activeBeneficiaryList,
  inActiveBeneficiaryList,
  activeOperationalUsers,
  inActiveOperationalUsers
) => {
  return {
    type: actionTypes.GET_BENEFICIARY_LIST,
    activeBeneficiaryList: activeBeneficiaryList,
    inActiveBeneficiaryList: inActiveBeneficiaryList,
    activeOperationalUsers: activeOperationalUsers,
    inActiveOperationalUsers: inActiveOperationalUsers
  };
};
export const storeCurrentBeneficiary = currentBeneficiary => {
  return {
    type: actionTypes.STORE_CURRENT_BENEFICIARY,
    currentBeneficiary: currentBeneficiary
  };
};
export const storeBulkUploadHistory = bulkUploadHistory => {
  return {
    type: actionTypes.STORE_BULK_UPLOAD_HISTORY,
    bulkUploadHistory: bulkUploadHistory
  };
};
export const logBeneficiaryError = error => {
  return {
    type: actionTypes.LOG_BENEFICIARY_ERROR,
    error: error
  };
};

export const clearBeneficiaryError = () => {
  return {
    type: actionTypes.CLEAR_BENEFICIARY_ERROR
  };
};

export const ValidateBulkDataError = bulkUserData => {
  return {
    type: actionTypes.VALIDATE_BULKDATA_ERROR,
    bulkUserData: bulkUserData
  };
};

export const ValidateBulkDataSuccess = () => {
  return {
    type: actionTypes.VALIDATE_BULKDATA_SUCCESS
  };
};

export const getBeneficiaryList = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Users/GetAllUsers`)
      .then(response => {
        if (response.data.success) {
          let activeBeneficiaryList = _.filter(response.data.data, function(
            beneficiary
          ) {
            return beneficiary.Active === true && beneficiary.Role === 3;
          });

          let inActiveBeneficiaryList = _.filter(response.data.data, function(
            beneficiary
          ) {
            return beneficiary.Active === false && beneficiary.Role === 3;
          });

          let activeOperationalUsers = _.filter(response.data.data, function(
            beneficiary
          ) {
            return beneficiary.Active === true && beneficiary.Role === 2;
          });

          let inActiveOperationalUsers = _.filter(response.data.data, function(
            beneficiary
          ) {
            return beneficiary.Active === false && beneficiary.Role === 2;
          });
          dispatch(
            storeBeneficiaryList(
              activeBeneficiaryList,
              inActiveBeneficiaryList,
              activeOperationalUsers,
              inActiveOperationalUsers
            )
          );
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};

export const getBeneficiaryById = id => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/Users/GetUser/${id}`)
      .then(response => {
        if (response.data.success) {
          let currentBeneficiary = response.data.data.Users[0];
          currentBeneficiary.PhoneNumber = currentBeneficiary.PhoneNumber.toString();
          dispatch(storeCurrentBeneficiary(currentBeneficiary));
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};

export const createBeneficiary = beneficiary => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/PostUser`, beneficiary)
      .then(response => {
        if (response.data.success) {
          let userCredentials = {
            UserName: beneficiary.PhoneNumber, //addd userName [email]
            Password: beneficiary.PhoneNumber,
            UserId: response.data.data.id,
            PhoneNumber: beneficiary.PhoneNumber
          };
          dispatch(postUserCredentials(userCredentials));
          dispatch(clearBeneficiaryError());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};

export const postUserCredentials = user => {
  return dispatch => {
    axios
      .post(
        `${AppConfig.serverURL}/api/UserCredentials/PostUserCredential`,
        user
      )
      .then(response => {
        if (!response.data.success) {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};
export const updateBeneficiary = (id, beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/PutUser?id=${id}`, beneficiary)
      .then(response => {
        if (response.data.success) {
          dispatch(clearBeneficiaryError());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};

export const deleteBeneficiary = (id, beneficiary) => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/PutUser?id=${id}`, beneficiary)
      .then(response => {
        if (response.data.success) {
          dispatch(getBeneficiaryList());
          dispatch(clearBeneficiaryError());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};

export const bulkUploadBeneficiary = beneficiary => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/BulkUploadUser`, beneficiary)
      .then(response => {
        if (response.data.success) {
          //dispatch(getBeneficiaryList());
          dispatch(clearBeneficiaryError());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};

export const bulkValidateBeneficiary = beneficiary => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/ValidateUploadUser`, beneficiary)
      .then(response => {
        if (!response.data.success)
          dispatch(ValidateBulkDataError(response.data.data.userList));
        else dispatch(ValidateBulkDataSuccess());
      })
      .catch(error => {
        //  dispatch(logBeneficiaryError(error));
      });
  };
};

export const getBulkUploadHistory = () => {
  return dispatch => {
    axios
      .get(`${AppConfig.serverURL}/api/BulkUploadRefs/GetBulkUploadRefs`)
      .then(response => {
        if (response.data.success) {
          let bulkUploadHistory = response.data.data.BulkUpload;
          bulkUploadHistory.forEach(record => {
            record.CreatedOn = record.CreatedOn.slice(0, 10);
          });
          dispatch(storeBulkUploadHistory(bulkUploadHistory));
        } else {
          dispatch(logBeneficiaryError(response.data.error));
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError(error.response.data.Message));
      });
  };
};
