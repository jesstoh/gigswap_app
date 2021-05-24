import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Redirect To other pages if user is not admin or not authenticated
function AdminRoute({ component: Component, ...rest }) {
  const { isAdmin, status } = useSelector(
    (state) => state.authentication
  );
  
  //Change to spinner
  let content = null;

  if (status !== 'idle') {
    if (isAdmin) {
      content = <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
    } else {
      content = <Redirect to="/" />
    }
  }

  return (<React.Fragment>{content}</React.Fragment>)
}

export default AdminRoute;
