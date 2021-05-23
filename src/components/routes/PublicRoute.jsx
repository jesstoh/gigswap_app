import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redirect To other pages if user is not admin or not authenticated
function PublicRoute({ component: Component, ...rest }) {

    //To configure later by checking store state
    // If user is not admin, redirect to other paths
  return (
    <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
  );
}

export default PublicRoute;