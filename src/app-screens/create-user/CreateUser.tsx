import { useState } from 'react';
import FormInput from '../../components/form-input/FormInput';
import './CreateUser.css';

const CreateUser = () => {
  const [formState, setFormState] = useState({
  });
  const regExOnlyLettersAndSpace: RegExp = /^[A-Za-z ]+$/;

  const handleCreateUser = () => {

  };

  return (
    <>
      <FormInput
        name={"Penis"}
        handleSubmit={handleCreateUser}
        setFormState={setFormState}
        type='User'
        maxLength={8}
      />
    </>
  );
};

export default CreateUser;