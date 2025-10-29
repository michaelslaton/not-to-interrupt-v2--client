import { useEffect, useState } from 'react';
import { useAppContext } from '../../App';
import RoomListEntry from './room-list-entry/RoomListEntry';
import './roomList.css';

const RoomList = () => {
  const { socket, appState } = useAppContext();
  const [roomList, setRoomList] = useState<{ id: string, name: string, users: string[] }[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleRoomList = (data: { id: string,  name: string; users: string[] }[]) => {
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
    if (socket) socket.emit('getRoomList');
  }, [socket, appState.roomData]);

  return (
    <div className='room-list-wrapper'>
      <div className='room-list'>
        { roomList.length ?
              roomList.map((room,i) => (
              <>
                <RoomListEntry data={room} index={i}/>
              </>
            ))
          :
            <>
              No Available Rooms
            </>
        }
      </div>
    </div>
  );
};

export default RoomList;