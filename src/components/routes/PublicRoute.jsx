import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not admin or not authenticated
function PublicRoute({ component: Component, ...rest }) {
  const { isAuthenticated, isHirer, isAdmin, status } = useSelector(
    (state) => state.authentication
  );

  // Change to spinner later
  let content = null;

  if (status !== 'idle') {
    if (!isAuthenticated) {
      content = (
        <Route
          {...rest}
          render={(props) => <Component {...props} {...rest} />}
        />
      );
      // Redirect to other pages if authenticated
    } else if (isHirer) {
      content = <Redirect to="/talents" />;
    } else if (isAdmin) {
      content = <Redirect to="/admin/dashboard" />;
    } else {
      content = <Redirect to="/gigs" />;
    }
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default PublicRoute;
