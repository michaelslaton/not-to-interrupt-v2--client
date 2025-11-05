import type { JSX } from 'react';
import { useAppContext } from '../../../App';
import type { UserType } from '../../../types/UserType.type';
import './usersScreen.css';

const UsersScreen = () => {
  const { appState } = useAppContext();
  const userList: UserType[] = appState.roomData!.users;
  console.log(userList[0].controller)

  const populateUsers = (): JSX.Element[] => {
    const formattedUsers = userList.map((user,i)=>(
      <div key={i} className='userController'>
        <div>
          🎙️
        </div>
        <div>
          {user.name}
        </div>
      </div>
    ));

    return formattedUsers;
  };

  return (
    <div className='users'>
      {populateUsers()}
    </div>
  );
};

export default UsersScreen;