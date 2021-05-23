import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not admin or not authenticated
function SharedRoute({ component: Component, ...rest }) {
  //Get state of current user role from store
  const { isAuthenticated, isAdmin } = useSelector(
    (state) => state.authentication
  );
  let content;

  if (!isAuthenticated) {
    content = <Redirect to="/" />;
    // Redirect to other pages if not hirer
  } else if (isAdmin) {
    content = <Redirect to="/admin/dashboard" />;
  } else {
    content = (
      <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
    );
  }

  //To configure later by checking store state
  // If user is not admin, redirect to other paths
  return <React.Fragment>{content}</React.Fragment>;
}

export default SharedRoute;
