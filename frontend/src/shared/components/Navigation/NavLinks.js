import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../routes';
import { AuthContext } from '../../context/authContext';
import s from './NavLinks.module.scss';

const NavLinks = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <ul className={s.navLinks}>
      <li>
        <NavLink to={routes.HOME} activeClassName={s.active} exact>
          ALL USERS
        </NavLink>
      </li>

      {isLoggedIn && (
        <li>
          <NavLink to={routes.USER_PLACES} activeClassName={s.active}>
            MY PLACES
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <NavLink to={routes.NEW_PLACE} activeClassName={s.active}>
            ADD PLACE
          </NavLink>
        </li>
      )}

      {!isLoggedIn && (
        <li>
          <NavLink to={routes.AUTH} activeClassName={s.active}>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
