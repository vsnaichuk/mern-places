import React from 'react';
import s from './MainHeader.module.scss';

const MainHeader = ({ children }) => {
  return <div className={s.mainHeader}>{children}</div>;
};

export default MainHeader;
