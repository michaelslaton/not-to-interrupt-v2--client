import { useState } from 'react';
import { useAppContext } from '../../App';
import { v4 as uuid } from 'uuid';
import FormInput from '../../components/form-input/FormInput';
import './CreateUser.css';

export type FormStateType = {
  newRoomName: string;
  newUserName: string;
};

const CreateUser = () => {
  const [formState, setFormState] = useState<FormStateType>({
    newRoomName: '',
    newUserName: ''
  });
  const { socket } = useAppContext();
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateUser = (e: Event): void => {
    e.preventDefault();
    const enteredName: string = formState.newUserName.trim();
    if(!socket.id) return console.error('No open socket');
    if(enteredName.length < 3) return console.error(`Entered User name is too short. (3 characters minimum)`);
    if(enteredName.length > 8) return console.error(`Entered User name is too long. (8 characters maximum)`);
    if(!regExOnlyLettersAndSpace.test(enteredName)) return console.error('Entered User name containes symbols or numbers.');
    if((enteredName.match(/ /g) || []).length > 1) return console.error('Entered User name containes too many spaces.');

    socket.emit('createUser', {
        id: uuid(),
        name: enteredName,
        socketId: socket.id,
    });
  };

  return (
    <>
      <FormInput
        name={formState.newUserName}
        handleSubmit={handleCreateUser}
        setFormState={setFormState}
        type='User'
        maxLength={8}
      />
    </>
  );
};

export default CreateUser;