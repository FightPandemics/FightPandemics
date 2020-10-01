import React, { createContext } from "react";
import io from "socket.io-client";
import {
  joinRoomSuccess,
  joinRoomError,
  receivedMessage,
  getChatLogSuccess,
  getChatLogError,
  identifyError,
  identifySuccess,
  getRoomsSuccess,
  getRoomsError,
  userStatusUpdate,
} from "../actions/wsActions";

const WebSocketContext = createContext();

export { WebSocketContext }

export default class SocketManager extends React.Component {
  socket = null;

  constructor(props) {
    super(props);
    this.state = {
        user: null
    }
    props.store.subscribe(() => {
        const newState = props.store.getState()
        if (this.state.user != newState.session.user){
            this.state.user = newState.session.user
            if (newState.session.isAuthenticated) this.identify(this.state.user);
            else this.socket.disconnect();
        }
    });
    this.socket = io.connect('localhost:8000');
    this.socket.on("connect", () => {
        this.socket.connected = true;
        console.log(`[WS]: Connected`);
        if (this.state.user) this.identify(this.state.user)
    });

    this.socket.on("disconnect", () => {
        this.socket.connected = false;
        console.log(`[WS]: Disconnected`);
        console.log(`[WS}]: Trying to reconnect!`);
        let recon = setInterval(() => {
            if (this.socket.connected) clearInterval(recon);
            this.socket.connect();
        }, 500);
    });

    this.socket.on("NEW_MESSAGE", (messageData) => {
        this.props.store.dispatch(receivedMessage(messageData));
    });

    this.socket.on("USER_STATUS_UPDATE", (data) => {
      if (!this.state.user || data.id == this.state.user.id) return
      this.props.store.dispatch(userStatusUpdate(data));
    })

  }

  identify = (userData) => {
    if (!this.socket || !this.socket) return
    this.socket.emit("IDENTIFY", userData, (response) => {
        if (response.code == 200) {
            console.log(`[WS]: ${userData.id} Identified`);
            this.props.store.dispatch(identifySuccess());
        }
        else this.props.store.dispatch(identifyError(response));
    });
  };

  sendMessage = async (messageData) => {
    return new Promise((resolve) => {
      this.socket.emit("SEND_MESSAGE", messageData, (response) => {
        if (response.code == 200) return resolve(true)
        resolve(false)
      });
    })

  };

  joinRoom = (data) => {
    return new Promise((resolve) => {
      this.socket.emit("JOIN_ROOM", data, (response) => {
        if (response.code == 200) {
          this.props.store.dispatch(joinRoomSuccess(response.data));
          return resolve(true)
        }
        else this.props.store.dispatch(joinRoomError());
        resolve(false)
      });
    })
  };

  getUserRooms = () => {
    this.socket.emit("GET_USER_THREADS", null, (response) => {
      if (response.code == 200) this.props.store.dispatch(getRoomsSuccess(response.data));
      else this.props.store.dispatch(getRoomsError());
    });
  };

  getChatLog = (data) => {
    this.socket.emit("GET_CHAT_LOG", data, (response) => {
      if (response.code == 200) this.props.store.dispatch(getChatLogSuccess(response.data));
      else this.props.store.dispatch(getChatLogError());
    });
  };


  getUserStatus = (userId) => {
    return new Promise((resolve) => {
      this.socket.emit("GET_USER_STATUS", userId, (response) => {
        if (response.code == 200) return resolve(response.data) // online/offline
        resolve(false)
      });
    })
  };

  messageSeen = () => {
    // later
  }

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
        joinRoom: this.joinRoom,
        getChatLog: this.getChatLog,
        getUserRooms: this.getUserRooms,
        getUserStatus: this.getUserStatus,
    }
    return (
      <WebSocketContext.Provider value={value}>
        {this.props.children}
      </WebSocketContext.Provider>
    );
  }
}

