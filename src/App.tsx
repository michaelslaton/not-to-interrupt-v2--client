import { createContext, useContext, useState } from 'react';
import './App.css'
import CreateUser from './app-screens/create-user/CreateUser';

type AppStateType = {
  user: null;
};

export const AppStateContext = createContext<{
appState: AppStateType;
setAppState: React.Dispatch<React.SetStateAction<AppStateType>>;
} | undefined>(undefined);

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if(!context) throw new Error('useAppStateContext must be used inside AppStateContext.Provider');
  return context;
};

const App = () => {
  const [appState, setAppState] = useState<AppStateType>({
    user: null,
  });

  const populateDisplay = () => {

    return (
      <CreateUser/>
    );
  };

  return (
    <>
      <div className='header'>
        <h1>Not to Interrupt 🎙️</h1>
      </div>
      {populateDisplay()}
    </>
  );
};

export default App;