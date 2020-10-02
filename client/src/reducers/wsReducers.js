import {
  IDENTIFY_SUCCESS,
  IDENTIFY_ERROR,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  GET_ROOMS_ERROR,
  GET_ROOMS_SUCCESS,
  RECEIVED_MESSAGE,
  GET_MESSAGES_HISTORY,
  GET_MESSAGES_HISTORY_ERROR,
  GET_MORE_MESSAGES_HISTORY,
  USER_STATUS_UPDATE,
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
      var index = state.rooms.findIndex(r => r._id == action.payload._id);
      if (index!=-1) state.rooms[index] = action.payload
      return {
        ...state,
        room: action.payload,
        rooms: state.rooms,
      }
    case JOIN_ROOM_ERROR:
      return {
        ...state,
        room: null
      }
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload.sort((a, b)=> { return new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt) })
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
    case GET_MESSAGES_HISTORY:
      return {
        ...state,
        chatLog: action.payload.reverse()
      }
    case GET_MESSAGES_HISTORY_ERROR:
      return {
        ...state,
        chatLog: []
      }
    case GET_MORE_MESSAGES_HISTORY:
      return {
        ...state,
        chatLog: [...action.payload.reverse(), state.chatLog]
      }
    case USER_STATUS_UPDATE:
      var index = state.rooms.findIndex(r => r.participants.find(p=>p.id==action.payload.id));
      if (index != -1) state.rooms[index].userStatus = action.payload.status
      else return state
      return {
        ...state,
      }
  }
  return state;
}

export default wsReducer;
