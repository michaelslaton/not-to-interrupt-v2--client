import { useEffect, useState, type FormEvent } from 'react';
import { useAppContext } from '../../../App';
import type { ChatEntryType } from '../../../types/ChatEntryType.type';
import './chatScreen.css';

const ChatScreen = () => {
  const { socket, appState } = useAppContext();
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatEntries, setChatEntries] = useState<ChatEntryType[] | []>([]);  
  
  useEffect(()=>{
    socket.emit('getChatEntries', { roomId: appState.roomData!.id });
    socket.on('getChatEntries', (data => setChatEntries(data)));
    return () => {
    socket.off('getChatEntries', (data => setChatEntries(data)));
    };
  },[]);

  const formatTimestamp = (date: Date): string => {
    const timeStamp: Date = new Date(date);
    let hours: number = timeStamp.getHours();
    const minutes: string = timeStamp.getMinutes().toString().padStart(2, "0");

    const ampm: string = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;  

    const month: string = (timeStamp.getMonth() + 1).toString().padStart(2, "0");
    const day: string = timeStamp.getDate().toString().padStart(2, "0");
    const year: string = timeStamp.getFullYear().toString().slice(2);

    return `${hours}:${minutes} ${ampm} ${month}/${day}/${year}`;
  };

  const populateChatEntries = () => {
    return (
      <>
        {chatEntries.map((entry, i)=>(
          <div key={i} className='chat__entry' style={{ backgroundColor: entry.user.color }}>
            <div className='chat__userName'>
              {entry.user.name}
            </div>
            <div className='chat__timestamp'>
              {`${formatTimestamp(entry.timeStamp)}`}
            </div>
            <section className='chat__message'>
              {entry.message}
            </section>
          </div>
        )).reverse()}
      </>
    );
  };

  const sendChat = (e: FormEvent): void => {
    e.preventDefault();
    const data = {
      roomId: appState.roomData!.id,
      user: appState.user!.id,
      message: chatMessage,
    };
    setChatMessage('');
    socket.emit('sendChat', data);
  };

  return (
    <div className='chat__wrapper'>
      <h3 className='section__title'>Chat</h3>
      <div className='chat'>
        <div className='chat__entries'>
          {populateChatEntries()}
        </div>

        <form
          onSubmit={(e)=> sendChat(e)}
          className='chat__input-wrapper'
        >
          <input
            onChange={(e)=> setChatMessage(e.target.value)}
            value={chatMessage}
            className='chat__input'
          />
          <button
            type='submit'
            className='chat__send'
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChatScreen;