import { RotatingLines } from 'react-loader-spinner';
import styles from './Spinner.module.css';

export const Spinner = () => {
  return (
    // 로딩 중일 때 사용할 스피너 컴포넌트 (라이브러리 사용)
    <div className={styles.spinner}>
      <RotatingLines width='100' strokeColor='#4A4F5A' />
    </div>
  );
};
