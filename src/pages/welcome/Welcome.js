import styles from './Welcome.module.css';
import Card from '../../components/UI/Card';

const Welcome = () => {
  return (
    <Card>
      <h1>Welcome to Trading Journal!</h1>
      <h4>Please Login to continue.</h4>
    </Card>
  );
};

export default Welcome;
