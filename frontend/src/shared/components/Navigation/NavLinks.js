import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../routes';
import s from './NavLinks.module.scss';

const NavLinks = () => {
  return (
    <ul className={s.navLinks}>
      <li>
        <NavLink to={routes.HOME} activeClassName={s.active} exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.PLACES} activeClassName={s.active}>
          MY PLACES
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.NEW_PLACE} activeClassName={s.active}>
          ADD PLACE
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.AUTH} activeClassName={s.active}>
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
