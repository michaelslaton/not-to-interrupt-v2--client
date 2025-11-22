import { useState } from 'react';
import { useAppContext } from '../../App';
import FormInput from '../../components/form-input/FormInput';
import type { NewUserType } from '../../types/UserType.type';
import './CreateUser.css';
import { handleError } from '../../utils/errors/handle-error/handleError';

const CreateUser = () => {
  const [inputName, setInputName] = useState<string>('');
  const { socket, setAppState } = useAppContext();
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateUser = (e: Event): void => {
    e.preventDefault();
    const enteredName: string = inputName.trim();
    if(!socket.id) return handleError({ setAppState, message: 'No open socket' });
    if(enteredName.length < 3) return handleError({ setAppState, message: 'Entered User name is too short. (3 characters minimum)'});
    if(enteredName.length > 8) return handleError({ setAppState, message: 'Entered name is too long (8 characters maximum)' });
    if(!regExOnlyLettersAndSpace.test(enteredName)) return handleError({ setAppState, message: 'User name can not contain special characters or numbers.' });
    if((enteredName.match(/ /g) || []).length > 1) return handleError({ setAppState, message: 'Entered User name containes too many spaces.' });

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