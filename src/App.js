import styles from './App.module.css';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <SideMenu />
    </div>
  );
}

export default App;
