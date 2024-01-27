import { Outlet } from 'react-router-dom';

import './navigation.styles.scss';

const Navigation = () => {
  return (
    <>
      <div>
        <h1>I am the navigation bar</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
