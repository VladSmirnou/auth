import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../router/constants/app-routes';

export const UserCreated = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((p) => p + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (timer > 4) return <Navigate to={APP_ROUTES.login} replace />;

  return (
    <div>
      <h1>Account was successfully created</h1>
      <div style={{ maxWidth: 600 }}>
        <label htmlFor="timer" style={{ display: 'block' }}>
          You will be redirected to the login page
        </label>
        <progress style={{ all: 'revert' }} id="timer" max="5" value={timer}>
          {timer}
        </progress>
      </div>
      <Link to={APP_ROUTES.login}>You can now login with your credentials</Link>
    </div>
  );
};
