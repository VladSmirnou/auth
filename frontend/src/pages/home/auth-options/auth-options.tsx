import type { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../hooks/typed-react-redux-hooks';
import { authModeChanged } from '../../../model/app-slice/app-slice';
import {
  authModesArray,
  type AppAuthModes,
  type AuthModes,
} from '../../../model/app-slice/types';
import { AUTH_MODE } from '../../../shared/constants/localstorage-keys';
import { RESET_OPTION_VALUE, DEFAULT_OPTION } from './constants';
import cn from 'classnames';
import styles from './auth-optinos.module.css';

export const AuthOptions = ({ authMode }: { authMode: AppAuthModes }) => {
  const dispatch = useAppDispatch();

  const handleSetAuthMode = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === RESET_OPTION_VALUE) {
      dispatch(authModeChanged(undefined));
      localStorage.removeItem(AUTH_MODE);
      return;
    }

    const typedSelectedValue = selectedValue as AuthModes;

    if (authModesArray.includes(typedSelectedValue)) {
      dispatch(authModeChanged(typedSelectedValue));
      localStorage.setItem(AUTH_MODE, typedSelectedValue);
    }
  };

  return (
    <div className={styles.select_wrapper}>
      <select
        className={cn(styles.select, {
          [styles.select_option_selected]: !!authMode,
        })}
        onChange={handleSetAuthMode}
        value={authMode ?? DEFAULT_OPTION}
      >
        <option
          className={cn(styles.option, styles.default_option)}
          disabled
          value={DEFAULT_OPTION}
        >
          Select mode
        </option>
        {authMode && (
          <option className={styles.option} value={RESET_OPTION_VALUE}>
            None
          </option>
        )}
        {authModesArray.map((mode, index) => {
          return (
            <option className={styles.option} key={index} value={mode}>
              {mode.toLowerCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};
