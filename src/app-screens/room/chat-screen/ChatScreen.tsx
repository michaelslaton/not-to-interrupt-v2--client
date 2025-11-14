import { useEffect, useState } from 'react';
import { useAppContext } from '../../../App';
import type { ChatEntryType } from '../../../types/ChatEntryType.type';
import './chatScreen.css';

const ChatScreen = () => {
  const { socket, appState } = useAppContext();
  const [chatEntries, setChatEntries] = useState<ChatEntryType[] | []>([]);  
  
  useEffect(()=>{
    socket.emit('getChatEntries', { roomId: appState.roomData!.id });
    socket.on('getChatEntries', (data => setChatEntries(data)));
    return () => {
    socket.off('getChatEntries', (data => setChatEntries(data)));
    }
  },[]);

  const populateChatEntries = () => {
    return (
      <>
        {chatEntries.map((entry, i)=>(
          <div key={i} className='chat__entry' style={{ backgroundColor: entry.color }}>
            <div className='chat__userName'>
              {entry.user.name}
            </div>
            <div className='chat__timestamp'>
              TimeStamp
            </div>
            <section className='chat__message'>
              {entry.message}
            </section>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='chat__wrapper'>
      <h3 className='section__title'>Chat</h3>
      <div className='chat'>
        <div className='chat__entries'>
          {populateChatEntries()}
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;