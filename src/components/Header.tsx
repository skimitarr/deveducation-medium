import { Outlet, Link } from "react-router-dom";
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { IPropAccounts } from './Interfaces';
import { userLocalDeleteData } from '../store/SomeSlice';
import logo from '../img/logo.png';

function Header(props : IPropAccounts) {
  const [isDataDeleted, setIsDataDeleted] = useState(false);
  const dispatch = useDispatch<Dispatch<any>>();

  const currentUser = () => {
    if (localStorage.length > 0)  {
      const user = JSON.parse(localStorage.user)
      const accounts = Object.keys(props.accounts).find((username) => username === user.username);

      for (const user in props.accounts) {
        if (user === accounts) {
          return (
          <div className="header__user">
            <img src={props.accounts[user].image} alt="logo user" />
          </div>)
        }
      }
    } else {
      return (
      <div className="header__text">
        Please log in
      </div>)
    }
  }

  const handleLogout = () => {
    dispatch(userLocalDeleteData());
    setIsDataDeleted(true);
  }

  useEffect(() => {
    if (isDataDeleted) {
      currentUser();
    }
  }, [isDataDeleted]);

  return (
    <>
      <header>
        <div className="header__container">
          <Link to='/' className="header__logo">
            <img src={logo} alt="logo" className="header__img" />
          </Link>
          <div className="header__wrapper">
            {currentUser()}
            {isDataDeleted
              ? <button disabled className="header__btn disabled" onClick={() => handleLogout()}>Log out</button>
              : <button className="header__btn" onClick={() => handleLogout()}>Log out</button>
            }
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default Header;
