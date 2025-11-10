import type { JSX } from 'react';
import { useAppContext } from '../../../App';
import type { UserType } from '../../../types/UserType.type';
import { faHandPaper } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import './usersScreen.css';

const UsersScreen = () => {
  const { appState, socket, setAppState } = useAppContext();
  const userList: UserType[] = appState.roomData!.users;
  const { afk } = appState.user!.controller;
  
  const isOwner = (id: string, ownerId: string) => {
    if(id === ownerId) return true;
    return false;
  };

  const handleAfk = (): void => {
    const newUserData = {
      ...appState.user,
      controller: {
        ...appState.user!.controller,
        afk: !afk
      }
    };
    socket.emit('updateUserInRoom', { roomId: appState.roomData!.id, newUserData: newUserData });
    setAppState(prev => ({
      ...prev,
      user: {
        ...prev.user!,
        controller: {
          ...prev.user!.controller!,
          afk: !afk,
        },
      },
    }));
  };

  const populateUsers = (): JSX.Element[] => {
    const ownerUser = (
      <div key='owner' className='userController button'>
        <div className='userName'>
          {appState.user!.name}
        </div>
        <div>
          🎙️
        </div>
        <button className='controllerButtonCleanUp button'>
          <FontAwesomeIcon icon={faHandPaper as IconProp}/>
        </button>
        <button
          className={`controllerButtonCleanUp button afk ${afk && 'active' }`}
          onClick={()=> handleAfk()}
        >
          AFK
        </button>
      </div>
    );

    const otherUsers = userList
      .filter(user => !isOwner(user.id, appState.user!.id))
      .map((user) => (
        <div key={user.id} className='userController'>
          <div className='userName'>
            {user.name}
          </div>
          <button className={`controllerButtonCleanUp button hasMic ${user.controller.hasMic && 'active'}`}>
            🎙️
          </button>
          <div className={`controllerButtonCleanUp handUp ${user.controller.handUp && 'active'}`}>
            <FontAwesomeIcon icon={faHandPaper as IconProp}/>
          </div>
          <div className={`afk ${user.controller.afk && 'active'}`}>
            AFK
          </div>
        </div>
    ));

    return [ownerUser, ...otherUsers];
  };

  return (
    <div className='users'>
      {populateUsers()}
    </div>
  );
};

export default UsersScreen;