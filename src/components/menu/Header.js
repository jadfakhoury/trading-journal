import styles from './Header.module.css';
import { Button, Box, Input } from '@mui/material';

const Header = (props) => {
  return (
    <nav className={styles.header}>
      <Box className={styles.box}>
        <Input className={styles.input} />
        <Input type='password' className={styles.input} />
        <Button className={styles.menuBtn} variant='contained'>
          Login
        </Button>
      </Box>
    </nav>
  );
};

export default Header;
