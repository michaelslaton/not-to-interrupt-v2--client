import type { AppStateType } from "../../../types/AppStateType.type";

type Props = {
  setAppState: React.Dispatch<React.SetStateAction<AppStateType>>;
  message: string;
};

export const handleError = ({ setAppState, message }: Props): void => {
    const error = new Error(message);

    console.error(error.message);

    setAppState(prev => ({
      ...prev,
      error: error.message,
    }));
};