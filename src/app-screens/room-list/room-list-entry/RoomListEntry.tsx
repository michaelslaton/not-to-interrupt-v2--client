import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/fontawesome-free-solid';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import './roomListEntry.css';
import { useAppContext } from '../../../App';

type Props = {
  data: {
    id: string,
    name: string,
    users: string[],
  };
  index: number;
}

const RoomListEntry = ({ data, index }: Props) => {
  const { id, name, users } = data;
  const { appState, socket } = useAppContext();

  const handleJoin = (): void => {
    if(appState.roomData) return;
    socket.emit('joinRoom', {
      userId: appState.user!.id,
      roomId: id,
    });
  };

  return (
    <div className='room-list-entry'>
      <div className='section'>
        {`${index+1}.`}
      </div>
      <div className='section'>
        {name}
      </div>
      <div className='section'>
        <FontAwesomeIcon icon={faUser as IconProp} />{users.length}
      </div>
      <div className='room-list-entry__button-wrapper section'>
        <button
          className='join-button'
          onClick={()=> handleJoin()}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomListEntry;