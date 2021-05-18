import { NavLink } from 'react-router-dom';
import st from './Navigation.module.css';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/selectors';

const Navigation = () => {
  const signedIn = useSelector(authSelectors.getIsSignIn);

  return (
    <nav className={st.navigation}>
      <NavLink exact className={st.link} activeClassName={st.activLink} to="/">
        Home
      </NavLink>
      {signedIn && (
        <NavLink
          exact
          className={st.link}
          activeClassName={st.activLink}
          to="/exchange"
        >
          Exchange
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
