import React, { createContext } from "react";
import io from "socket.io-client";
import {
  joinRoomSuccess,
  joinRoomError,
  leaveAllRoomsSuccess,
  receivedMessage,
  getChatLogSuccess,
  getChatLogError,
  identifyError,
  identifySuccess,
  getRoomsSuccess,
  getRoomsError,
  userStatusUpdate,
  loadMoreSuccess,
  setLastMessage,
  messageDeleted,
  messageEdited,
  getNotificationsSuccess,
  notificationReceived,
} from "../actions/wsActions";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

const WebSocketContext = createContext();

export { WebSocketContext };

export default class SocketManager extends React.Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isIdentified: false,
    };
    props.store.subscribe(() => {
      const newState = props.store.getState();
      if (this.state.isAuthenticated != newState.session.isAuthenticated) {
        this.setState({ isAuthenticated: newState.session.isAuthenticated });
        if (this.state.isAuthenticated && !this.state.isIdentified)
          this.identify();
        else this.socket.disconnect();
      }
    });
    this.socket = io.connect(isLocalhost ? "localhost:8000" : null);
    this.socket.on("connect", () => {
      this.socket.connected = true;
      console.log(`[WS]: Connected`);
      if (!this.state.isAuthenticated) return this.socket.disconnect();
      if (this.state.isAuthenticated && !this.state.isIdentified)
        this.identify();
    });

    this.socket.on("disconnect", () => {
      this.socket.connected = false;
      this.setState({ isIdentified: false });
      console.log(`[WS]: Disconnected`);
      let recon = setInterval(() => {
        if (!this.state.isAuthenticated) return;
        if (this.socket.connected) return clearInterval(recon);
        console.log(`[WS]: Trying to reconnect!`);
        this.socket.connect();
      }, 1000);
    });

    this.socket.on("MESSAGE_RECEIVED", (messageData) => {
      this.props.store.dispatch(receivedMessage(messageData));
      this.props.store.dispatch(setLastMessage(messageData));
    });

    this.socket.on("MESSAGE_DELETED", (messageId) => {
      this.props.store.dispatch(messageDeleted(messageId));
    });

    this.socket.on("MESSAGE_EDITED", (newMessage) => {
      this.props.store.dispatch(messageEdited(newMessage));
    });

    this.socket.on("NEW_MESSAGE_NOTIFICATION", (messageData) => {
      this.props.store.dispatch(receivedMessage(messageData, true));
      // isNotification == true, because user is online but is not in same room
    });

    this.socket.on("USER_STATUS_UPDATE", (data) => {
      if (!this.state.user || data.id == this.state.user.id) return;
      this.props.store.dispatch(userStatusUpdate(data));
    });

    // user was blocked while online.
    this.socket.on("FORCE_ROOM_UPDATE", (threadId) => {
      if (props.store.getState().ws.room?._id == threadId)
        return this.joinRoom({ threadId });
      this.getUserRooms();
    });

    this.socket.on("NEW_NOTIFICATION", (notificationData) => {
      this.props.store.dispatch(notificationReceived(notificationData));
    });
  }

  identify = () => {
    // we set isIdentified:true now, because this request might take time
    this.setState({ isIdentified: true });
    // if we keep it false, it function will run twice
    // but we revert to "false" if identification failed
    if (!this.socket || !this.state.isIdentified) return;
    this.socket.emit("IDENTIFY", null, (response) => {
      if (response.code == 200) {
        console.log(`[WS]: ${response.data} Identified`);
        this.getUserRooms();
        this.getNotifications();
        return this.props.store.dispatch(identifySuccess());
      } else this.props.store.dispatch(identifyError(response));
      // if we reached this then the identification has failed
      this.setState({ isIdentified: false });
    });
  };

  sendMessage = async (messageData) => {
    return new Promise((resolve) => {
      this.socket.emit("SEND_MESSAGE", messageData, (response) => {
        if (response.code == 200) return resolve(true);
        resolve(false);
      });
    });
  };

  deleteMessage = (messageId) => {
    this.socket.emit("DELETE_MESSAGE", messageId);
  };

  editMessage = (data) => {
    this.socket.emit("EDIT_MESSAGE", data);
  };

  joinRoom = (data) => {
    return new Promise((resolve) => {
      this.socket.emit("JOIN_ROOM", data, (response) => {
        if (response.code == 200) {
          this.props.store.dispatch(joinRoomSuccess(response.data));
          return resolve(response.data);
        } else this.props.store.dispatch(joinRoomError());
        resolve(false);
      });
    });
  };

  leaveAllRooms = () => {
    this.joinRoom({});
    this.props.store.dispatch(leaveAllRoomsSuccess());
  };

  getUserRooms = () => {
    this.socket.emit("GET_USER_THREADS", null, (response) => {
      if (response.code == 200)
        this.props.store.dispatch(getRoomsSuccess(response.data));
      else this.props.store.dispatch(getRoomsError());
    });
  };

  getChatLog = (data) => {
    this.socket.emit("GET_CHAT_LOG", data, (response) => {
      if (response.code == 200)
        this.props.store.dispatch(getChatLogSuccess(response.data));
      else this.props.store.dispatch(getChatLogError());
    });
  };

  loadMore = (data) => {
    return new Promise((resolve) => {
      this.socket.emit("GET_CHAT_LOG_MORE", data, (response) => {
        if (response.code == 200) {
          this.props.store.dispatch(loadMoreSuccess(response.data));
          return resolve(true);
        }
        resolve(false);
      });
    });
  };

  getUserStatus = (userId) => {
    return new Promise((resolve) => {
      this.socket.emit("GET_USER_STATUS", userId, (response) => {
        if (response.code == 200) return resolve(response.data); // online/offline
        resolve(false);
      });
    });
  };

  blockThread = (threadId) => {
    return new Promise((resolve) => {
      this.socket.emit("BLOCK_THREAD", threadId, (response) => {
        if (response.code == 200) {
          this.joinRoom({ threadId }); // refresh room only
          return resolve(true);
        }
        resolve(false);
      });
    });
  };

  archiveThread = (threadId) => {
    return new Promise((resolve) => {
      this.socket.emit("ARCHIVE_THREAD", threadId, async (response) => {
        if (response.code == 200) {
          await this.joinRoom({ threadId }); // await refresh room
          this.leaveAllRooms(); // then leave it
          return resolve(true);
        }
        resolve(false);
      });
    });
  };

  // used to unblock, but also used to unarchive and accept requests.
  unblockThread = (threadId) => {
    return new Promise((resolve) => {
      this.socket.emit("UNBLOCK_THREAD", threadId, (response) => {
        if (response.code == 200) {
          this.getUserRooms(); // refresh rooms
          this.joinRoom({ threadId }); // refresh room
          return resolve(true);
        }
        resolve(false);
      });
    });
  };

  getNotifications = () => {
    this.socket.emit("GET_NOTIFICATIONS", null, (response) => {
      if (response.code == 200)
        this.props.store.dispatch(getNotificationsSuccess(response.data));
    });
  };

  markNotificationsAsRead = () => {
    this.socket.emit("MARK_NOTIFICATIONS_AS_READ");
  };

  componentWillUnmount() {
    try {
      this.socket !== null && this.socket.disconnect();
    } catch (e) {
      // socket not connected
    }
  }

  render() {
    const value = {
      identify: this.identify,
      sendMessage: this.sendMessage,
      deleteMessage: this.deleteMessage,
      editMessage: this.editMessage,
      joinRoom: this.joinRoom,
      getChatLog: this.getChatLog,
      loadMore: this.loadMore,
      getUserRooms: this.getUserRooms,
      getUserStatus: this.getUserStatus,
      leaveAllRooms: this.leaveAllRooms,
      blockThread: this.blockThread,
      archiveThread: this.archiveThread,
      unblockThread: this.unblockThread,
      getNotifications: this.getNotifications,
      markNotificationsAsRead: this.markNotificationsAsRead,
    };
    return (
      <WebSocketContext.Provider value={value}>
        {this.props.children}
      </WebSocketContext.Provider>
    );
  }
}
