import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not admin or not authenticated
function SharedRoute({ component: Component, ...rest }) {
  //Get state of current user role from store
  const { isAuthenticated, isAdmin, status } = useSelector(
    (state) => state.authentication
  );

  //Change to spinner later
  let content = null;
  if (status !== 'idle') {
    if (!isAuthenticated) {
      content = <Redirect to="/" />;
      // Redirect to other pages if not hirer or talent
    } else if (isAdmin) {
      content = <Redirect to="/admin/dashboard" />;
    } else {
      content = (
        <Route
          {...rest}
          render={(props) => <Component {...props} {...rest} />}
        />
      );
    }
  }

  //To configure later by checking store state
  // If user is not admin, redirect to other paths
  return <React.Fragment>{content}</React.Fragment>;
}

export default SharedRoute;
