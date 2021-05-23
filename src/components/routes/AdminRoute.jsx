import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not admin or not authenticated
function AdminRoute({ component: Component, ...rest }) {
  const { isAdmin } = useSelector(
    (state) => state.authentication
  );

  return isAdmin ? (
    <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
  ) : (
    <Redirect to="/" />
  );
}

export default AdminRoute;
