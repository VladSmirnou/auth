import { Link } from 'react-router-dom';
import { ApplinkProps } from './types';
import styles from './link.module.css';
import cn from 'classnames';

export const AppLink = (props: ApplinkProps) => {
  return <Link {...props} className={cn(styles.link, props.className)} />;
};
