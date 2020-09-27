import {
  IDENTIFY_SUCCESS,
  IDENTIFY_ERROR,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  SEND_MESSAGE,
  MESSAGE_SEEN,
  GET_ROOMS_ERROR,
  GET_ROOMS_SUCCESS,
  RECEIVED_MESSAGE,
  UPDATE_MESSAGES_HISTORY,
  UPDATE_MESSAGES_HISTORY_ERROR,
} from "../actions/wsActions";

const initialState = {
  room: null,
  rooms: [],
  chatLog: [],
  isIdentified: false,
  newMessage: null,
};

function wsReducer(state = initialState, action) {
  switch (action.type) {
    case IDENTIFY_SUCCESS:
      return {
        ...state,
        isIdentified: true
      }
    case IDENTIFY_ERROR:
      return {
        ...state,
        isIdentified: false
      }
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload
      }
    case JOIN_ROOM_ERROR:
      return {
        ...state,
        room: null
      }
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload
      }
    case GET_ROOMS_ERROR:
      return {
        ...state,
        rooms: []
      }
    case RECEIVED_MESSAGE:
      return {
        ...state,
        chatLog: [...state.chatLog, action.payload]
      }
    /*case MESSAGE_SEEN:
      return {
        ...state,
        newMessage: null
      }*/
    case UPDATE_MESSAGES_HISTORY:
      return {
        ...state,
        chatLog: action.payload
      }
    case UPDATE_MESSAGES_HISTORY_ERROR:
      return {
        ...state,
        rooms: []
      }
  }
  return state;
}

export default wsReducer;
