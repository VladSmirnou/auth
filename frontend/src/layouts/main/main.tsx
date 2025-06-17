import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { ToastContainer } from 'react-toastify';
import styles from './main.module.css';

export const MainLayout = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};
