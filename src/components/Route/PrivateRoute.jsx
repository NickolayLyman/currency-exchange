import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import authSelectors from '../../redux/selectors';

export default function PrivateRoute({
  children,
  redirectTo = '/',
  ...routeProps
}) {
  const isSignIn = useSelector(authSelectors.getIsSignIn);

  return (
    <Route {...routeProps}>
      {isSignIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
