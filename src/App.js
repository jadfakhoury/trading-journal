import { useContext } from 'react';
import styles from './App.module.css';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import Login from './components/login/Login';
import AuthContext from '../store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.mainDiv}>
        <Login forgotPassLink='/' registerLink='/' />
      </div>
      <SideMenu />
    </div>
  );
}

export default App;
