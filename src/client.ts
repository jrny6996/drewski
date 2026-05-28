/**
 * Establishes a browser-based WebSocket connection.
 * @param url The WebSocket server URL (e.g., 'ws://localhost:8080')
 * @returns A promise that resolves to the connected WebSocket instance
 */

function connectWebSocket(url: string): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    let socket = new WebSocket(url);

    // Resolve when the connection is open
    socket.onopen = () => {
      console.log('Successfully connected to:', url);
      resolve(socket);
    };

    // Reject if the initial connection fails
    socket.onerror = (error) => {
      console.error('WebSocket connection error:', error);
      reject(error);
    };
  });
}


async function startApp() {
  try {
    const ws = await connectWebSocket('ws://localhost:8080');
    
    // Now you can safely send messages
    ws.send('Hello Server!');
    
    // Setup your message listener
    ws.onmessage = (event) => console.log('Data:', event.data);
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

void startApp();
