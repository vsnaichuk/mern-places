import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import Logo from '../UIElements/Logo';
import MainHeader from './MainHeader';
import s from './MainNavigation.module.scss';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <SideDrawer show={isDrawerOpen} onClose={toggleDrawer}>
        <nav className={s.navigationDrawerNav}>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button onClick={toggleDrawer} className={s.navigationBtn}>
          <span />
          <span />
          <span />
        </button>

        <Link to={routes.HOME} className={s.navigationHome}>
          <Logo width="50" height="48" />

          <h1 className={s.title}>YourPlaces</h1>
        </Link>

        <nav className={s.navigationHeaderNav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
