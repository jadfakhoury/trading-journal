import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';
import Card from '../../components/UI/Card';

const Welcome = () => {
  return (
    <Card className={styles.card}>
      <h1>Welcome to Trading Journal!</h1>
      <h4>
        Please <Link to='/login'> Login</Link> to continue.
      </h4>
    </Card>
  );
};

export default Welcome;
