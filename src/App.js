import styles from './App.module.css';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import Login from './components/login/Login';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.mainDiv}>
        <Login />
      </div>
      <SideMenu />
    </div>
  );
}

export default App;
