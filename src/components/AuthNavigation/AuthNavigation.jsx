import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import st from './AuthNavigation.module.css';
import authSelectors from '../../redux/selectors';
import operation from '../../redux/operation';

const AuthNavigation = () => {
  const signedIn = useSelector(authSelectors.getIsSignIn);
  const name = useSelector(authSelectors.getUsername);
  const history = useHistory();
  const login = () => history.push('/login');
  const registration = () => history.push('/register');
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(operation.signOut());
  };

  return (
    <div>
      {signedIn ? (
        <div className={st.wrapper}>
          <h2 className={st.userName}>{name}</h2>
          <button onClick={logOut} className={st.logOutBtn}>
            Log Out
          </button>
        </div>
      ) : (
        <>
          <button onClick={registration} className={st.btnRegister}>
            Registration
          </button>
          <button onClick={login} className={st.btnLogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default AuthNavigation;
