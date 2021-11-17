import styles from './App.module.css';
import Box from '@mui/material/Box';
import SideMenu from './components/menu/SideMenu';

function App() {
  return (
    <div className={styles.App}>
      <Box className={styles.header}></Box>
      <SideMenu />
    </div>
  );
}

export default App;
