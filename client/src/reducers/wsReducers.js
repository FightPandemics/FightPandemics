import {
  IDENTIFY_SUCCESS,
  IDENTIFY_ERROR,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_ERROR,
  LEAVE_ALL_ROOMS,
  GET_ROOMS_ERROR,
  GET_ROOMS_SUCCESS,
  MESSAGE_RECEIVED,
  MESSAGE_DELETED,
  GET_MESSAGES_HISTORY,
  GET_MESSAGES_HISTORY_ERROR,
  GET_MORE_MESSAGES_HISTORY,
  USER_STATUS_UPDATE,
  SET_LAST_MESSAGE,
  MESSAGE_EDITED,
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
        isIdentified: true,
      };
    case IDENTIFY_ERROR:
      return {
        ...state,
        isIdentified: false,
      };
    case JOIN_ROOM_SUCCESS:
      // update the room in [rooms], but keep the user status (to avoid status flickering) and keep topic
      var index = state.rooms.findIndex((r) => r._id == action.payload._id);
      if (index != -1) {
        state.rooms[index] = {
          ...action.payload,
          userStatus: state.rooms[index].userStatus,
          topic: state.rooms[index].topic,
        };
        action.payload.userStatus = state.rooms[index].userStatus;
        action.payload.topic = state.rooms[index].topic;
      }
      return {
        ...state,
        room: action.payload,
        rooms: state.rooms,
      };
    case JOIN_ROOM_ERROR:
      return {
        ...state,
        room: null,
        chatLog: [],
      };
    case LEAVE_ALL_ROOMS:
      return {
        ...state,
        room: null,
        chatLog: [],
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload.sort((a, b) => {
          return (
            new Date(b.lastMessage?.createdAt) -
            new Date(a.lastMessage?.createdAt)
          );
        }),
      };
    case GET_ROOMS_ERROR:
      return {
        ...state,
        rooms: [],
      };
    case MESSAGE_RECEIVED:
      if (action.isNotification) {
        var index = state.rooms.findIndex(
          (r) => r._id == action.payload.threadId,
        );
        if (index != -1) {
          state.rooms[index].lastMessage = action.payload;
          if (action.payload.postRef)
            state.rooms[index].topic = action.payload.postRef.title;
          for (const participant of state.rooms[index].participants) {
            // since we don't have access to logged-in user.id we will just apply this to all participants
            // because it doesn't matter, and we will only user the one that maches user.id at the end
            participant.newMessages++;
          }
        }
      } else {
        state.chatLog = [...state.chatLog, action.payload];
      }
      state.rooms.sort((a, b) => {
        return (
          new Date(b.lastMessage?.createdAt) -
          new Date(a.lastMessage?.createdAt)
        );
      });
      return {
        ...state,
      };
    case SET_LAST_MESSAGE:
      var index = state.rooms.findIndex(
        (r) => r._id == action.payload.threadId,
      );
      if (index != -1) {
        state.rooms[index].lastMessage = action.payload;
        if (action.payload.postRef)
          state.rooms[index].topic = action.payload.postRef.title;
      }
      state.rooms.sort((a, b) => {
        return (
          new Date(b.lastMessage?.createdAt) -
          new Date(a.lastMessage?.createdAt)
        );
      });
      return {
        ...state,
      };
    case MESSAGE_DELETED:
      var messageIndex = state.chatLog.findIndex(
        (m) => m._id == action.payload,
      );
      if (messageIndex != -1) {
        state.chatLog[messageIndex] = {
          ...state.chatLog[messageIndex],
          content: null,
          status: "deleted",
          postRef: null,
        };
      }
      return {
        ...state,
      };
    case MESSAGE_EDITED:
      var messageIndex = state.chatLog.findIndex(
        (m) => m._id == action.payload._id,
      );
      if (messageIndex != -1) {
        state.chatLog[messageIndex] = action.payload;
      }
      return {
        ...state,
      };
    case GET_MESSAGES_HISTORY:
      return {
        ...state,
        chatLog: action.payload.reverse(),
      };
    case GET_MESSAGES_HISTORY_ERROR:
      return {
        ...state,
        chatLog: [],
      };
    case GET_MORE_MESSAGES_HISTORY:
      if (!action.payload.length) state.room.loadedAll = true;
      return {
        ...state,
        chatLog: [...action.payload.reverse(), ...state.chatLog],
      };
    case USER_STATUS_UPDATE:
      var index = state.rooms.findIndex((r) =>
        r.participants.find((p) => p.id == action.payload.id),
      );
      if (index != -1) {
        state.rooms[index].userStatus = action.payload.status;
        if (state.room && state.room._id == state.rooms[index]._id)
          state.room.userStatus = action.payload.status;
      } else return state;
      return {
        ...state,
      };
  }
  return state;
}

export default wsReducer;
