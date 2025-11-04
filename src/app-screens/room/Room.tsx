import { useAppContext } from '../../App';
import ChatScreen from './chat-screen/ChatScreen';
import UsersScreen from './users-screen/UsersScreen';
import type { RoomType } from '../../types/RoomType.type';
import './room.css';

const Room = () => {
  const { appState } = useAppContext();
  const { id, name }: RoomType = appState.roomData!;

  if (!id) return <div>Loading room...</div>;

  return (
    <div className='room-wrapper'>
      <div>
        <h1>{name}</h1>
      </div>
      <div className='room-windows'>
        <UsersScreen/>
        <ChatScreen/>
      </div>
    </div>
  );
};

export default Room;