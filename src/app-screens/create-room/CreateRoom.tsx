import { useState } from 'react';
import { useAppContext } from '../../App';
import FormInput from '../../components/form-input/FormInput';
import './createRoom.css';
import { handleError } from '../../utils/errors/handle-error/handleError';

const CreateRoom = () => {
  const [inputName, setInputName] = useState<string>('');
  const { socket, appState, setAppState } = useAppContext();
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateRoom = (e: Event): void  => {
    e.preventDefault();
    const enteredName: string = inputName.trim();
    if(!socket.id) return handleError({ setAppState, message: 'No open socket' });
    if(enteredName.length < 3) return handleError({ setAppState, message: 'Entered room name is too short. (3 characters minimum)'});
    if(enteredName.length > 15) return handleError({ setAppState, message: 'Entered room name is too long (15 characters maximum)' });
    if(!regExOnlyLettersAndSpace.test(enteredName)) return handleError({ setAppState, message: 'Room name can not contain special characters or numbers.' });

    socket.emit('createRoom', {
      name: enteredName,
      userId: appState.user!.id,
    });
    socket.emit('getRoomList');
  };

  return (
    <div className='create-room-wrapper'>
      <FormInput
        inputValue={inputName}
        handleSubmit={handleCreateRoom}
        setInputName={setInputName}
        name='Room'
        maxLength={15}
      />
    </div>
  );
};

export default CreateRoom;