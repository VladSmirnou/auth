import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MAX_PROGRESS_VALUE } from './constants';

const condition = (timer: number) => timer > MAX_PROGRESS_VALUE - 1;

type Props = {
  loginPageRedirectUrl: string;
};

export const UserCreated = ({ loginPageRedirectUrl }: Props) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((timer) => {
        if (condition(timer)) {
          return timer;
        }
        return timer + 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (condition(timer)) return <Navigate to={loginPageRedirectUrl} replace />;

  return (
    <div>
      <h1>Account was successfully created</h1>
      <div style={{ maxWidth: 600 }}>
        <label htmlFor="timer" style={{ display: 'block' }}>
          You will be redirected to the login page
        </label>
        <progress
          style={{ all: 'revert' }}
          id="timer"
          max={MAX_PROGRESS_VALUE}
          value={timer}
        >
          {timer}
        </progress>
      </div>
      <Link to={loginPageRedirectUrl}>
        You can now login with your credentials
      </Link>
    </div>
  );
};
