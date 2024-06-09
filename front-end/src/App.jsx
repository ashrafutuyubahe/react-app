import './App.css';
import React, { useEffect } from 'react';
import io from "socket.io-client";

const socket = io.connect('http://localhost:3000');

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`New user with id of ${socket.id} connected`);
    });

    return () => {
      socket.disconnect(); // Clean up by disconnecting the socket when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <h3>Hello this is a chat application</h3>
      <form>
        <input type="text" />
        <button type='submit'>Send message</button>
      </form>
    </div>
  );
}

export default App;
