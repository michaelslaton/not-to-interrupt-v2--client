import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CreateUser from './app-screens/create-user/CreateUser';
import type { AppStateType } from './types/AppStateType.type';
import './App.css'
import RoomList from './app-screens/room-list/RoomList';
import CreateRoom from './app-screens/create-room/CreateRoom';

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
    const handleAppData = (data: any) => {
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

    return () => {
      socket.off('updateData', handleAppData);
      // socket.off('getRoomList', handleRoomList);
    };
  }, [appState.user]);

  const populateDisplay = () => {
    if(!appState.user) return <CreateUser/>;
    if(appState.user && !appState.roomData) return (
      <>
        <RoomList/>
        <CreateRoom/>
      </>
    );
    else return <RoomList/>;
  };

  return (
    <AppContext.Provider value={{appState, setAppState, socket}}>
      <div className='header'>
        <h1>Not to Interrupt 🎙️</h1>
        { appState.user && <h2>{appState.user.name}</h2>}
      </div>
      <div className='center-space'>
        {populateDisplay()}
      </div>
    </AppContext.Provider>
  );
};

export default App;