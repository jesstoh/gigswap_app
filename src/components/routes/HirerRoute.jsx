import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not admin or not authenticated
function HirerRoute({ component: Component, ...rest }) {
  //Get state of current user role from store
  const { isAuthenticated, isHirer, isAdmin } = useSelector(
    (state) => state.authentication
  );
  let content;

  
  if (isHirer) {
    content = (
      <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
    );
    // Redirect to other pages if not hirer
  } else if (!isAuthenticated) {
    content = <Redirect to="/" />;
  } else if (isAdmin) {
    content = <Redirect to="/admin/dashboard" />;
  } else {
    content = <Redirect to="/gigs" />;
  }


  return <React.Fragment>{content}</React.Fragment>;
}

export default HirerRoute;
