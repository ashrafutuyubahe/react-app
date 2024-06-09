import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`New user with id of ${socket.id} connected`);
      // Join the room when the client connects
      socket.emit("joinRoom", roomName);
    });

    socket.on("receivedMessage", (receivedMessage, roomReceived) => {
    
        setReceivedMessage(receivedMessage);
      
   
    });
  }, [roomName]);

  function handleSendMessage(event) {
    event.preventDefault();
    socket.emit("messagesent", message, roomName);
    setMessage("");
  }

  return (
    <div className="App">
      <h3>Hello, this is a chat application</h3>
      <input
        type="text"
        placeholder="Enter the name of the room you would like to join"
        onChange={(e) => {
          setRoomName(e.target.value);
          console.log(roomName);
        }}
      />
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send message</button>
      </form>

      {receivedMessage && (
        <h3 style={{ display: "block" }}>
          Received message: {receivedMessage}
        </h3>
      )}
    </div>
  );
}

export default App;
