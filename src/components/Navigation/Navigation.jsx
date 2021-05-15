import { NavLink } from 'react-router-dom';
import st from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={st.navigation}>
      <NavLink exact className={st.link} activeClassName={st.activLink} to="/">
        Home
      </NavLink>
      <NavLink
        exact
        className={st.link}
        activeClassName={st.activLink}
        to="/exchange"
      >
        Exchange
      </NavLink>
    </nav>
  );
};

export default Navigation;
