import './formInput.css';

type FormInputProps = {
  inputValue?: string;
  handleSubmit: Function;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  maxLength: number;
};

const FormInput = ({ inputValue, handleSubmit, name, setInputName, maxLength }: FormInputProps) => {

  return (
    <div className='form-input__container'>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input
          type='text'
          className='form-input__input'
          placeholder={`${name} Name`}
          value={inputValue}
          onChange={(e)=> setInputName(e.target.value )}
          data-testid='formInput-input'
          maxLength={maxLength}
        />
        <button
          className='form-input__create'
          type='submit'
        >
          Create {name}
        </button>
      </form>
    </div>
  );
};

export default FormInput;