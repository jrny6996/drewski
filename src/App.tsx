//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './App.css'
//import Button from './Button'
import Game from './Game'
import { useState, useEffect, useRef } from 'react'

function App() {
 
  const[lobbyID, setLobbyID] = useState<string>('');;
  const [serverMessages, setServerMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://macmini:8080/game");
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Connected to server");
  }
  socket.onmessage = (e) => {
    console.log(e.data);
    try{
      const data = JSON.parse(e.data);
      if(data.type === "lobby_created" || data.lobby_id){
        setLobbyID(data.lobby_id);
      }
    }catch(err){
      console.error("Could not parse incoming message as JSON", err);
    }
  };
  return () =>  socket.close(); }, [] );

  const requestLobby = () => {
    socketRef.current?.send(JSON.stringify({ lobby_id: "", type: "lobby_request", data: null }));
  };
  


  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Chess!</h1>
      
      {!lobbyID ? (
        /* --- LOBBY VIEW (Shown if no lobbyId exists) --- */
        <div style={lobbyContainerStyle}>
          <h3>Welcome to the Lobby</h3>
          <p>Status: {isConnected ? "🟢 Online" : "🔴 Offline"}</p>
          
          <button onClick={requestLobby} style={buttonStyle}>
            Start New Game
          </button>

          <div style={logBoxStyle}>
            <h4>Server Feed:</h4>
            {serverMessages.map((m, i) => <div key={i}>{m}</div>)}
          </div>
        </div>
      ) : (
        /* --- GAME VIEW (Shown once lobbyId is received) --- */
        <div>
          <div style={{ marginBottom: '10px', color: '#666' }}>
            Connected to Lobby: <strong>{lobbyID}</strong>
          </div>
          {/* We pass the socket or lobbyId to your Game component as props */}
          <Game lobbyId={lobbyID} socket={socketRef.current} />
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const lobbyContainerStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px'
};

const logBoxStyle = {
  marginTop: '20px',
  height: '150px',
  overflowY: 'auto' as 'auto',
  background: '#f4f4f4',
  padding: '10px',
  fontSize: '12px',
  fontFamily: 'monospace'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
};

export default App
