import React from 'react';
import HirerHeader from './HirerHeader';
import TalentHeader from './TalentHeader';
import AdminHeader from './AdminHeader';
import PublicHeader from './PublicHeader';
import { useSelector } from 'react-redux';

function HeaderContainer() {
  const { isAuthenticated, isHirer, isAdmin, status } = useSelector(
    (state) => state.authentication
  );
  let content = null;

  if (status !== 'idle') {
    if (!isAuthenticated) {
      content = <PublicHeader />;
    } else if (isAdmin) {
      content = <AdminHeader />;
    } else if (isHirer) {
      content = <HirerHeader />;
    } else {
      content = <TalentHeader />;
    }
  }

  return <div>{content}</div>;
}

export default HeaderContainer;
