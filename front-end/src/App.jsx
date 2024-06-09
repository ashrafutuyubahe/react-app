import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setmessage] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`New user with id of ${socket.id} connected`);
    });
  }, []);

  function handleSendMessage(message){
   socket.emit('send_message',{message}) 
  }


  return (
    <div className="App">
      <h3>Hello, this is a chat application</h3>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setmessage(e.target.value);
          }}
        />
        <button type="submit" >Send message</button>
      </form>
    </div>
  );
}

export default App;
