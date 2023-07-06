import Link from 'next/link';
import styles from '../styles/home.module.scss';

const Index = () => {

  return (
   <div className={styles.homeMainCintainer}>
    <h3>
    This project resolved for test task admin-panel
    </h3>
    Your are in Home Page.
    <br />
    <Link href={'/login'}>Go To Login Page</Link>
     <div>
      Credetntials for test login is: email: test@nyblecraft.com, password: 12345678qQ</div>
   </div>
  );
};

export default Index;
