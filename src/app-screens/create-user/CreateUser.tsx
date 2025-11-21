import { useState } from 'react';
import { useAppContext } from '../../App';
import FormInput from '../../components/form-input/FormInput';
import type { NewUserType } from '../../types/UserType.type';
import './CreateUser.css';

const CreateUser = () => {
  const [inputName, setInputName] = useState<string>('');
  const { socket, setAppState } = useAppContext();
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateUser = (e: Event): void => {
    e.preventDefault();
    const enteredName: string = inputName.trim();
    if(!socket.id) return console.error('No open socket');
    if(enteredName.length < 3) return console.error('Entered User name is too short. (3 characters minimum)');
    if((enteredName.match(/ /g) || []).length > 1) return console.error('Entered User name containes too many spaces.');
    if(enteredName.length > 8) {
      setAppState(prev => ({
        ...prev,
        error: 'Entered User name is too long. (8 characters maximum).'
      }));
      return;
    };
    if(!regExOnlyLettersAndSpace.test(enteredName)) {
      setAppState(prev => ({
        ...prev,
        error: 'Room name can not contain special characters or numbers.'
      }));
      return;
    };

    const newUser: NewUserType = {
        name: enteredName,
        socketId: socket.id,
    };
    socket.emit('createUser', newUser);
  };

  return (
    <div className='create-user-wrapper'>
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