import { useEffect, useState, type FormEvent, type JSX } from 'react';
import { useAppContext } from '../../../App';
import type { ChatEntryType } from '../../../types/ChatEntryType.type';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import './chatScreen.css';

const ChatScreen = () => {
  const { socket, appState } = useAppContext();
  const [chatMessage, setChatMessage] = useState<string>('');
  const [tempColor, setTempColor] = useState<string>('');
  const [chatEntries, setChatEntries] = useState<ChatEntryType[] | []>([]); 
  
  useEffect(()=>{
    socket.emit('getChatEntries', { roomId: appState.roomData!.id });
    socket.on('getChatEntries', (data => setChatEntries(data)));
    setTempColor(appState.user!.color);
    
    return () => {
    socket.off('getChatEntries', (data => setChatEntries(data)));
    };
  },[]);

  const formatTimestamp = (date: Date): string => {
    if(!date) return '';

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

  const populateChatEntries = (): JSX.Element => {
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
    if(chatMessage.trim().length <= 0) return;
    const data = {
      roomId: appState.roomData!.id,
      user: appState.user!.id,
      message: chatMessage.trim(),
    };
    setChatMessage('');
    socket.emit('sendChat', data);
  };

  const handleSendColor = (): void => {
    if(appState.user!.color === tempColor) return;
    const updatedUser = {
      ...appState.user,
      color: tempColor,
    };
    socket.emit('updateColor', { roomId: appState.roomData!.id, newUserData: updatedUser });
  };

  return (
    <div className='chat__wrapper'>
      <h3 className='section__title'>Chat</h3>
      <div className='chat'>
        <div className='chat__entries'>
          {populateChatEntries()}
        </div>

        <div className='chat__controls'>
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

          <div className='chat__input-wrapper'>
            <input
              type='color'
              id='color'
              name='color'
              onChange={(e) => setTempColor(e.target.value)}
              value={tempColor}
              className='chat__color-select'
            />
            <button
              className={`color__send ${appState.user!.color !== tempColor && 'unsaved'}`}
              onClick={handleSendColor}
            >
              <FontAwesomeIcon icon={faRightFromBracket as IconProp}/>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatScreen;