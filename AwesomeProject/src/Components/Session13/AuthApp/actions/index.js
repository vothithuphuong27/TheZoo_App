import * as Actiontypes from './types';
import axios from 'axios';

export const loginAsync = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: Actiontypes.AUTH_LOGIN_PENDING,
    });
    axios
      .post('https://training.softech.cloud/api/users/login', {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.length === 0) {
          dispatch({
            type: Actiontypes.AUTH_LOGIN_FAILD,
            user: null,
          });
        } else {
          dispatch({
            type: Actiontypes.AUTH_LOGIN_SUCCESS,
            user: response.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: Actiontypes.AUTH_LOGIN_ERROR,
          user: error,
        });
      });
  };
};
