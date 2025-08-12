import { useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { WS_BASE_URL, ANDROID_WS_BASE_URL } from '../config';

const useActionCable = ({ parentId, isLoggedIn, onMessage }) => {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const currentParentId = useRef(null);

  const disconnect = () => {
    if (wsRef.current) {
      console.log('Closing WebSocket connection...');
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
      setConnected(false);
      currentParentId.current = null;
    }
  };

  const connect = () => {
    if (!parentId || !isLoggedIn) return;

    if (wsRef.current && currentParentId.current === parentId) {
      console.log('Already connected for this parentId, skipping connect');
      return;
    }

    disconnect();

    currentParentId.current = parentId;
    const base_url = Platform.OS === 'android' ? ANDROID_WS_BASE_URL : WS_BASE_URL;
    const ws = new WebSocket(`${base_url}/cable`);

    ws.onopen = () => {
      setConnected(true);
      console.log(`Connected with parentId=${parentId}`);
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
      console.warn('WebSocket closed.');
      setConnected(false);
      wsRef.current = null;
      if (isLoggedIn) {
        setTimeout(connect, 3000);
      }
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    if (isLoggedIn && parentId) {
      connect();
    } else {
      disconnect();
    }

    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !wsRef.current &&
        isLoggedIn &&
        parentId
      ) {
        connect();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      disconnect();
      subscription.remove();
    };
  }, [parentId, isLoggedIn]);

  return { connected };
};

export default useActionCable;
