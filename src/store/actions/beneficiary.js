import * as actionTypes from "../actions/actionTypes";
import axios from "axios";
import AppConfig from "../../constants/AppConfig";
import _ from "lodash";

export const catchUncaughtException = exception => {
  return {
    type: actionTypes.CATCH_UNCAUGHT_EXCEPTION,
    exception: exception
  };
};
export const clearUncaughtException = () => {
  return {
    type: actionTypes.CLEAR_UNCAUGHT_EXCEPTION
  };
};
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
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
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
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
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
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
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
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
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
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
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
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
      });
  };
};

export const bulkUploadBeneficiary = beneficiary => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/BulkUploadUser`, beneficiary)
      .then(response => {
        if (response.data.success) {
          dispatch(getBeneficiaryList());
          dispatch(clearBeneficiaryError());
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
      });
  };
};

export const bulkValidateBeneficiary = beneficiary => {
  return dispatch => {
    axios
      .post(`${AppConfig.serverURL}/api/Users/ValidateUploadUser`, beneficiary)
      .then(response => {
        if (!response.data.success) {
          dispatch(ValidateBulkDataError(response.data.data.userList));
          dispatch(clearUncaughtException());
        } else {
          dispatch(clearUncaughtException());
          dispatch(ValidateBulkDataSuccess());
        }
      })
      .catch(error => {
        dispatch(catchUncaughtException("Something went wrong!"));
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
          dispatch(clearUncaughtException());
        } else {
          dispatch(logBeneficiaryError(response.data.error));
          dispatch(clearUncaughtException());
        }
      })
      .catch(error => {
        dispatch(logBeneficiaryError("Something went wrong!"));
        dispatch(catchUncaughtException("Something went wrong!"));
      });
  };
};
