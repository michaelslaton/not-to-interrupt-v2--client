import { useEffect, useState } from 'react';
import { useAppContext } from '../../App';
import './roomList.css';

const RoomList = () => {
  const { socket } = useAppContext();
  const [roomList, setRoomList] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (!socket) return;
    const handleRoomList = (data: { name: string }[]) => setRoomList(data);

    socket.emit('getRoomList');
    socket.on('roomListUpdate', handleRoomList);

    const interval = setInterval(() => {
      socket.emit('getRoomList');
    }, 5000);

    return () => {
      clearInterval(interval);
      socket.off('roomListUpdate', handleRoomList);
    };
  }, [socket]);

  return (
    <div className='app-screen'>
      <div className='room-list'>
        {roomList.map((room,i) => (
          <div key={i}>{room.name}</div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
