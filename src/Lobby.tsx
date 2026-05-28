import React, { useState, useEffect, useRef } from 'react';

export default function LobbyStartPage() {
  // --- State Management ---
  const [lobbyId, setLobbyId] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [status, setStatus] = useState<string>('Connecting...');

  // Use a ref to hold the WebSocket instance so it persists across renders
  const socketRef = useRef<WebSocket | null>(null);

  // --- WebSocket Lifecycle ---
  useEffect(() => {
    // Initialize connection
    const socket = new WebSocket("ws://macmini:8080/game");
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus('Connected');
      addMessage("Status: Connected");
    };

    socket.onmessage = (e) => {
      console.log(e.data);
      addMessage(`Server: ${e.data}`);
      
      try {
        const data = JSON.parse(e.data);
        if (data.type === "lobby_created") {
          setLobbyId(data.lobby_id);
        }
        // Future: Handle your incoming board state here
      } catch (err) {
        console.error("Could not parse incoming message as JSON", err);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket connection error:', error);
      setStatus('Connection Error');
    };

    socket.onclose = () => {
      setStatus('Disconnected');
    };

    // Cleanup: close the socket when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Helper Functions ---
  const addMessage = (msg: string) => {
    // Append new message to the existing array of messages
    setMessages((prev) => [...prev, msg]);
  };

  const sendDebugMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ lobby_id: lobbyId, type: "debug", data: inputText })
      );
      setInputText(""); 
    }
  };

  const requestLobby = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ lobby_id: lobbyId, type: "lobby_request", data: null })
      );
    }
  };

  // --- UI Render ---
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Game Lobby</h2>
      <p><strong>Connection Status:</strong> {status}</p>
      <p><strong>Current Lobby ID:</strong> {lobbyId || 'None'}</p>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={requestLobby} disabled={status !== 'Connected'}>
          Request New Lobby
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Debug data..."
          style={{ marginRight: '10px' }}
        />
        <button onClick={sendDebugMessage} disabled={status !== 'Connected'}>
          Send Debug Message
        </button>
      </div>

      <div style={{ 
        border: '1px solid #ccc', 
        height: '300px', 
        overflowY: 'scroll', 
        padding: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'monospace'
      }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}