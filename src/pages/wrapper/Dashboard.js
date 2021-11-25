import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../components/store/auth-context';

const Dashboard = (props) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <h1>Hello inside</h1>;
};

export default Dashboard;
