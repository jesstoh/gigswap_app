import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not authenticated
function PrivateRoute({ component: Component, ...rest }) {
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
    } else {
      content = (
        <Route
          {...rest}
          render={(props) => <Component {...props} {...rest} />}
        />
      );
    }
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default PrivateRoute;