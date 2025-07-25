import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { WS_BASE_URL } from '../config';

const useActionCable = ({ parentId, onMessage }) => {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
  const appState = useRef(AppState.currentState);

  const connect = () => {
    const ws = new WebSocket(`${WS_BASE_URL}/cable`); // TODO: use wss:// in prod

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'FamilyChannel',
          parent_id: parentId
        })
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'ping' || data.type === 'confirm_subscription') return;

      if (data.message && onMessage) {
        onMessage(data.message);
      }
    };

    ws.onerror = (error) => {
      console.warn('WebSocket error', error.message);
    };

    ws.onclose = () => {
      console.warn('WebSocket closed. Reconnecting...');
      setConnected(false);
      setTimeout(connect, 3000); // simple retry
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    connect();

    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // Reconnect when app comes to foreground
        connect();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      wsRef.current?.close();
      subscription.remove();
    };
  }, [parentId]);

  return { connected };
};

export default useActionCable;
