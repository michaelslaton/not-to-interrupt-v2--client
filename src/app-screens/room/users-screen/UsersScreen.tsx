import { useAppContext } from '../../../App';
import './usersScreen.css';

const UsersScreen = () => {
  const { appState } = useAppContext();

  console.log(appState.roomData?.users)

  return (
    <div className='users'>
      {appState.roomData?.users.map((user)=> <div>{user.name}</div>)}
    </div>
  );
};

export default UsersScreen;