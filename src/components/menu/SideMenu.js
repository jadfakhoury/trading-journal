import styles from './SideMenu.module.css';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SideMenu = () => {
  const onClickHandler = () => {
    console.log('Button was clicked');
  };

  return (
    <Box className={styles.menuBox}>
      <ButtonGroup className={styles.menuGroup} orientation='vertical'>
        <Button
          onClick={onClickHandler}
          className={styles.menuBtn}
          variant='text'
        >
          One
        </Button>
        <Button
          onClick={onClickHandler}
          className={styles.menuBtn}
          variant='text'
        >
          Two
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default SideMenu;
