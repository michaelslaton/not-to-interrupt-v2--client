import { useAppContext } from '../../App';
import './errorDisplay.css';

const ErrorDisplay = () => {
  const { appState, setAppState } = useAppContext();

  const handleError = (): boolean => {
    if(appState.error) return true;
    return false;
  };

  const handleClose = () => {
    setAppState(prev => ({
      ...prev,
      error: null,
    }));
  };

  console.log(appState.error)
  
  return (
    <>
      { handleError() ?
        <div className='error__wrapper'>
          {`${handleError() ? appState.error : ''}`}
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