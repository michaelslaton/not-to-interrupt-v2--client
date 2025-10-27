import { useState } from 'react';
import { useAppContext } from '../../App';
import FormInput from '../../components/form-input/FormInput';
import './createRoom.css';

const CreateRoom = () => {
  const [inputName, setInputName] = useState<string>('');
  const { socket } = useAppContext();
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateRoom = (e: Event): void  => {
    e.preventDefault();
    const enteredName: string = inputName.trim();

    socket.emit('createRoom', {
      name: enteredName,
    });
    socket.emit('getRoomList');
  };

  return (
    <div className='app-screen'>
      <FormInput
        inputValue={inputName}
        handleSubmit={handleCreateRoom}
        setInputName={setInputName}
        name='Room'
        maxLength={12}
      />
    </div>
  );
};

export default CreateRoom;