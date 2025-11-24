import { useEffect, useState } from 'react';
import { useAppContext } from '../../App';
import RoomListEntry from './room-list-entry/RoomListEntry';
import type { RoomListingType } from '../../types/RoomType.type';
import './roomList.css';
import { handleError } from '../../utils/errors/handle-error/handleError';

const RoomList = () => {
  const { socket, appState, setAppState } = useAppContext();
  const [roomList, setRoomList] = useState<RoomListingType[]>([]);

  useEffect(() => {
    if(!socket.id) return handleError({ setAppState, message: 'No open socket' });

    const handleRoomList = (data: RoomListingType[]): void => {
      setRoomList(data);
    };

    socket.on('roomListUpdate', handleRoomList);
    socket.emit('getRoomList');

    const interval = setInterval(() => {
      socket.emit('getRoomList');
    }, 5000);

    return () => {
      clearInterval(interval);
      socket.off('roomListUpdate', handleRoomList);
    };
  }, [socket]);

  useEffect(() => {
    if(socket) socket.emit('getRoomList');
  }, [socket, appState.roomData]);

  return (
    <div className='room-list-wrapper'>
      <div className='room-list-container'>
        <div className='room-list'>
          { roomList.length ?
              roomList.map((room,i) => (
                <RoomListEntry data={room} index={i}/>
              ))
            :
              <div className='no-rooms'>
                No Available Rooms
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RoomList;