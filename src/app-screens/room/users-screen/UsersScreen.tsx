import type { JSX } from 'react';
import { useAppContext } from '../../../App';
import type { UserType } from '../../../types/UserType.type';
import { faHandPaper } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import './usersScreen.css';

const UsersScreen = () => {
  const { appState, socket, setAppState } = useAppContext();
  const { afk, handUp, hasMic } = appState.user!.controller;
  const userList: UserType[] = appState.roomData!.users;
  
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

  const handleHandUp = (): void => {
    if(hasMic && !handUp) return;
    const newUserData = {
      ...appState.user,
      controller: {
        ...appState.user!.controller,
        handUp: !handUp
      }
    };
    socket.emit('updateUserInRoom', { roomId: appState.roomData!.id, newUserData: newUserData });
    setAppState(prev => ({
      ...prev,
      user: {
        ...prev.user!,
        controller: {
          ...prev.user!.controller!,
          handUp: !handUp,
        },
      },
    }));
  };

  const handlePassTheMic = (toUserId: string) => {
    if(!appState.user?.controller.hasMic) return;
    
    const foundUser = appState.roomData?.users.find((user)=> user.id === toUserId);
    if(!foundUser) return;
    if(foundUser.controller.hasMic) return console.log('na', foundUser.controller.hasMic);

    socket.emit('passTheMic', {
      fromUserId: appState.user!.id,
      toUserId,
      roomId: appState.roomData!.id
    });
  };

  const populateUsers = (): JSX.Element[] => {
    const ownerUser = (
      <div key='owner' className='userController owner button'>
        <div className='userName'>
          {appState.user!.name}
        </div>
        <div
          className={`hasMic ${hasMic && 'active'}`}
          onClick={()=> console.log(hasMic)}
        >
          🎙️
        </div>
        <button
          className={`controllerButtonCleanUp button handUp ${handUp && 'active'}`}
          onClick={()=> handleHandUp()}
        >
          <FontAwesomeIcon icon={faHandPaper as IconProp}/>
        </button>
        <button
          className={`controllerButtonCleanUp button afk ${afk && 'active'}`}
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
          <button
            className={`controllerButtonCleanUp button hasMic ${user.controller.hasMic && 'active'}`}
            onClick={()=> handlePassTheMic(user.id)}
          >
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