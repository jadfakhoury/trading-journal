import styles from './Login.module.css';
import { Box, Button, Input, ButtonGroup } from '@mui/material';

const Login = () => {
  return (
    <Box className={styles.box}>
      <ButtonGroup className={styles.menuGroup} orientation='vertical'>
        <h2>Hello! let's get started</h2>
        <h4>Sign in to continue.</h4>
        <Input placeholder='Username' className={styles.input} />
        <Input
          placeholder='Password'
          type='password'
          className={styles.input}
        />
        <div className={styles.keepSigned}>
          <label className={styles.flexStart}>
            <input type='checkbox' /> Keep me signed in
          </label>
          <a href='/' className={styles.flexEnd}>
            Forgot password?
          </a>
        </div>
        <Button className={styles.menuBtn} variant='contained'>
          Login
        </Button>
        <div>
          {' '}
          Don't have an account? <a href='/'>Create</a>
        </div>
      </ButtonGroup>
    </Box>
  );
};

export default Login;
