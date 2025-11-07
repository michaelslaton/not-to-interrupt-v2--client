import type { JSX } from 'react';
import { useAppContext } from '../../../App';
import type { UserType } from '../../../types/UserType.type';
import { faHandPaper } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import './usersScreen.css';

const UsersScreen = () => {
  const { appState } = useAppContext();
  const userList: UserType[] = appState.roomData!.users;
  
  const isOwner = (id: string, ownerId: string) => {
    if(id === ownerId) return true;
    return false;
  };

  const populateUsers = (): JSX.Element[] => {
    const ownerUser = (
      <div key='owner' className='userController owner'>
        <div className='userName'>
          {appState.user!.name}
        </div>
        <div>
          🎙️
        </div>
        <button className='controllerButton owner'>
          <FontAwesomeIcon icon={faHandPaper as IconProp}/>
        </button>
        <button className='controllerButton owner'>
          AFK
        </button>
      </div>
    );

    const otherUsers = userList
      .filter(user => !isOwner(user.id, appState.user!.id))
      .map((user, i) => (
        <div key={i} className='userController'>
          <div className='userName'>
            {user.name}
          </div>
          <button className={`controllerButton hasMic ${user.controller.hasMic && 'active'}`}>
            🎙️
          </button>
          <div className={`controllerButton handUp ${user.controller.handUp && 'active'}`}>
            <FontAwesomeIcon icon={faHandPaper as IconProp}/>
          </div>
          <div className={`controllerButton afk ${user.controller.afk && 'active'}`}>
            AFK
          </div>
        </div>
      )
    );

    return [ownerUser, ...otherUsers];
  };

  return (
    <div className='users'>
      {populateUsers()}
    </div>
  );
};

export default UsersScreen;