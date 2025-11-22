import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CreateUser from './app-screens/create-user/CreateUser';
import type { AppStateType } from './types/AppStateType.type';
import './App.css'
import RoomList from './app-screens/room-list/RoomList';
import CreateRoom from './app-screens/create-room/CreateRoom';
import Room from './app-screens/room/Room';
import ErrorDisplay from './utils/errors/error-display/ErrorDisplay';
import { handleError } from './utils/errors/handle-error/handleError';

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL || 'localhost:3000');

export const AppContext = createContext<{
appState: AppStateType;
setAppState: React.Dispatch<React.SetStateAction<AppStateType>>;
socket: Socket;
} | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) throw new Error('useAppStateContext must be used inside AppStateContext.Provider');
  return context;
};

const App = () => {
  const [appState, setAppState] = useState<AppStateType>({
    user: null,
    roomData: null,
    error: null,
  });

  useEffect(() => {
    const handleAppData = (data: any): void => {
      const { user, roomData } = data;
      let newAppState = {};

      if(user) newAppState = { ...newAppState, user };
      if(roomData) newAppState = { ...newAppState, roomData };

      setAppState(prev => ({
        ...prev,
        ...newAppState
      }));
    };
    
    socket.on('updateData', handleAppData);
    socket.on('error', (data)=> handleError({ setAppState, message: data }));

    return () => {
      socket.off('updateData', handleAppData);
      socket.off('error', (data)=> handleError({ setAppState, message: data }));
    };
  }, []);

  const populateDisplay = () => {
    if(!appState.user) return <CreateUser/>;
    if(appState.user && !appState.roomData) return (
      <>
        <RoomList/>
        <CreateRoom/>
      </>
    );
    if(appState.roomData) return <Room/>;
    else return <RoomList/>;
  };

  return (
    <AppContext.Provider value={{appState, setAppState, socket}}>
      <div className='header'>
        <h1>Not to Interrupt 🎙️</h1>
      </div>
      <ErrorDisplay/>
      <div className='center-space'>
        {populateDisplay()}
      </div>
    </AppContext.Provider>
  );
};

export default App;