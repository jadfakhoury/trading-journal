import { Route, Routes, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Welcome from './pages/welcome/Welcome';
import Dashboard from './pages/wrapper/Dashboard';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.mainDiv}>
        <Routes>
          <Route exact path='/' element={<Navigate to='/Welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route
            exact
            path='/login'
            element={
              <Login forgotPassLink='/forgotPass' registerLink='/register' />
            }
          />
          <Route exact path='/register' element={<Register />} />
          <Route path='*' element={<Dashboard />} />
          <Route exact path='/Dashboard' element={<Dashboard />} />
        </Routes>
      </main>
      <SideMenu />
    </div>
  );
}

export default App;
