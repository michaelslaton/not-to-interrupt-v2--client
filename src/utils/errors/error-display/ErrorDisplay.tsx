import { useAppContext } from '../../../App';
import './errorDisplay.css';

const ErrorDisplay = () => {
  const { appState, setAppState } = useAppContext();

  const isError = (): boolean => {
    if(appState.error) return true;
    return false;
  };

  const handleClose = () => {
    setAppState(prev => ({
      ...prev,
      error: null,
    }));
  };
  
  return (
    <>
      { isError() ?
        <div className='error__wrapper'>
          {`${isError() ? appState.error : ''}`}
          <button
          onClick={()=> handleClose()}
          >
            {` Close`}
          </button>
        </div>
        :
        <></>
      }
    </>
  );
};

export default ErrorDisplay;