import { NavLink } from 'react-router-dom';
import { ApplinkProps } from './types';
import cn from 'classnames';
import styles from './app-link.module.css';

export const AppLink = ({ className, ...rest }: ApplinkProps) => {
  return (
    <NavLink
      {...rest}
      className={({ isActive }) => {
        return cn(styles.link, className, {
          [styles.active_link]: isActive,
        });
      }}
    />
  );
};
