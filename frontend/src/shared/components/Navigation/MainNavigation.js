import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
import s from './MainNavigation.module.scss';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import Logo from '../UIElements/Logo';

const MainNavigation = (props) => {
  return (
    <>
      <MainHeader>
        <button className={s.navigationBtn}>
          <span />
          <span />
          <span />
        </button>

        <Link to={routes.HOME} className={s.navigationHome}>
          <Logo width="50" height="48" />

          <h1 className={s.navigationTitle}>YourPlaces</h1>
        </Link>

        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
