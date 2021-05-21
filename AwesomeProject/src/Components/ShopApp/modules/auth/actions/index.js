import * as ActionTypes from './types';

export const signInAction = (email, password) => ({
  type: ActionTypes.AUTH_SIGNIN,
  email,
  password,
});
export const signOutAction = () => ({
  type: ActionTypes.AUTH_SIGNOUT,
});
export const registerAction = (email, password, name, role) => ({
  type: ActionTypes.AUTH_REGISTER,
  email,
  password,
  name,
  role,
});

export const addAddressAction = (name, phone, address, uid) => ({
  type: ActionTypes.AUTH_ADD_ADDRESS,
  uid: uid,
  name,
  phone,
  address,
});

export const EditAddressAction = (name, phone, address) => ({
  type: ActionTypes.AUTH_EDIT_ADDRESS,
  name,
  phone,
  address,
});

export const UpdateAddressAction = (name, phone, address, id) => ({
  type: ActionTypes.AUTH_UPDATE_ADDRESS,
  name,
  phone,
  address,
  id,
});

export const NumberNotification = (numberBadges, contentNotification) => ({
  type: ActionTypes.AUTH_NUMBER_NOTIFICATION,
  numberBadges,
  contentNotification,
});
export const clearBadgeNotification = (ClearBadgeNumber) => ({
  type: ActionTypes.AUTH_CLEAR_NOTIFICATION,
  ClearBadgeNumber,
});
export const deleteAddressAction = (address) => ({
  type: ActionTypes.AUTH_DELETE_ADDRESS,
  address,
});
export const deleteNotificationAction = (notification) => ({
  type: ActionTypes.AUTH_DELETE_NOTIFICATIONS,
  notification,
});
export const updateProfileAction = (name, image, phone) => ({
  type: ActionTypes.AUTH_UPDATE_PROFILE,
  name,
  image,
  phone,
});
export const updateNotification = (numberBadges) => ({
  type: ActionTypes.AUTH_UPDATE_NUMBER_BADGES,
  numberBadges,
});
