import { useState } from 'react';
import { useAppContext } from '../../App';
import { v4 as uuid } from 'uuid';
import FormInput from '../../components/form-input/FormInput';
import './CreateUser.css';

const CreateUser = () => {
  const [inputName, setInputName] = useState<string>('');
  const { socket } = useAppContext();
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateUser = (e: Event): void => {
    e.preventDefault();
    const enteredName: string = inputName.trim();
    if(!socket.id) return console.error('No open socket');
    if(enteredName.length < 3) return console.error('Entered User name is too short. (3 characters minimum)');
    if(enteredName.length > 8) return console.error('Entered User name is too long. (8 characters maximum)');
    if(!regExOnlyLettersAndSpace.test(enteredName)) return console.error('Entered User name containes symbols or numbers.');
    if((enteredName.match(/ /g) || []).length > 1) return console.error('Entered User name containes too many spaces.');

    socket.emit('createUser', {
        id: uuid(),
        name: enteredName,
        socketId: socket.id,
    });
  };

  return (
    <div className='app-screen'>
      <FormInput
        inputValue={inputName}
        handleSubmit={handleCreateUser}
        setInputName={setInputName}
        name='User'
        maxLength={8}
      />
    </div>
  );
};

export default CreateUser;