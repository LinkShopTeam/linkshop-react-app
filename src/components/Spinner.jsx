import { RotatingLines } from 'react-loader-spinner';
import styles from '/src/styles/components/Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <RotatingLines width='100' strokeColor='#4A4F5A' />
    </div>
  );
};
