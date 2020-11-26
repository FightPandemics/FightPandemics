export const IDENTIFY_SUCCESS = "IDENTIFY_SUCCESS";
export const IDENTIFY_ERROR = "IDENTIFY_ERROR";

export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR";
export const LEAVE_ALL_ROOMS = "LEAVE_ALL_ROOMS";

export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_ERROR = "GET_ROOMS_ERROR";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const MESSAGE_DELETED = "MESSAGE_DELETED";
export const MESSAGE_EDITED = "MESSAGE_EDITED";

export const GET_MESSAGES_HISTORY = "GET_MESSAGES_HISTORY";
export const GET_MESSAGES_HISTORY_ERROR = "GET_MESSAGES_HISTORY_ERROR";

export const GET_MORE_MESSAGES_HISTORY = "GET_MORE_MESSAGES_HISTORY";

export const USER_STATUS_UPDATE = "USER_STATUS_UPDATE";

export const SET_LAST_MESSAGE = "SET_LAST_MESSAGE";

export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const NEW_NOTIFICATION = "NEW_NOTIFICATION";
export const LOCAL_NOTIFICATIONS_MARK_AS_READ =
  "LOCAL_NOTIFICATIONS_MARK_AS_READ";

export function identifySuccess() {
  return {
    type: IDENTIFY_SUCCESS,
  };
}

export function identifyError(error) {
  return {
    type: IDENTIFY_ERROR,
    error,
  };
}

export function joinRoomSuccess(payload) {
  return {
    type: JOIN_ROOM_SUCCESS,
    payload,
  };
}

export function joinRoomError() {
  return {
    type: JOIN_ROOM_ERROR,
  };
}

export function leaveAllRoomsSuccess() {
  return {
    type: LEAVE_ALL_ROOMS,
  };
}

export function getRoomsSuccess(payload) {
  return {
    type: GET_ROOMS_SUCCESS,
    payload,
  };
}

export function getRoomsError() {
  return {
    type: GET_ROOMS_ERROR,
  };
}

export function sendMessage(payload) {
  return {
    type: SEND_MESSAGE,
    payload,
  };
}

export function receivedMessage(payload, isNotification) {
  return {
    type: MESSAGE_RECEIVED,
    payload,
    isNotification,
  };
}

export function getChatLogSuccess(payload) {
  return {
    type: GET_MESSAGES_HISTORY,
    payload,
  };
}

export function getChatLogError() {
  return {
    type: GET_MESSAGES_HISTORY_ERROR,
  };
}

export function userStatusUpdate(userId) {
  return {
    type: USER_STATUS_UPDATE,
    payload: userId,
  };
}

export function loadMoreSuccess(payload) {
  return {
    type: GET_MORE_MESSAGES_HISTORY,
    payload,
  };
}

export function setLastMessage(payload) {
  return {
    type: SET_LAST_MESSAGE,
    payload,
  };
}

export function messageDeleted(payload) {
  return {
    type: MESSAGE_DELETED,
    payload,
  };
}

export function messageEdited(payload) {
  return {
    type: MESSAGE_EDITED,
    payload,
  };
}

export function notificationReceived(payload) {
  return {
    type: NEW_NOTIFICATION,
    payload,
  };
}

export function getNotificationsSuccess(payload) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload,
  };
}
