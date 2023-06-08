import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { IStateFromStore } from './Interfaces';
import logo from '../img/logo.png';

function Header() {
  const accountsFromStore = useSelector((state: IStateFromStore) => state.some.allAccounts);
  const [isDataDeleted, setIsDataDeleted] = useState(false);

  useEffect(() => {
    if (isDataDeleted) {
      currentUser();
    }
  }, [isDataDeleted]);

  const findUser = (storage: Storage) => {
    const user = JSON.parse(storage.user);
    const account = Object.keys(accountsFromStore).find((username) => username === user.username);
    for (const item in accountsFromStore) {
      if (item === account) {
        return (
          <div className='header__user'>
            <img src={accountsFromStore[item].image} alt='logo user' />
          </div>
        );
      }
    }
  };

  const currentUser = () => {
    if (localStorage.user) {
      return findUser(localStorage);
    } else if (sessionStorage.user) {
      return findUser(sessionStorage);
    } else {
      return <div className='header__text'>Please log in</div>;
    }
  };

  const handleLogout = () => {
    if (localStorage.user) {
      localStorage.user.removeItem('user');
    }
    if (sessionStorage.user) {
      sessionStorage.removeItem('user');
    }
    setIsDataDeleted(true);
  };

  return (
    <>
      <header>
        <div className='header__container'>
          <Link to='/login' className='header__logo'>
            <img src={logo} alt='logo' className='header__img' />
          </Link>
          <div className='header__wrapper'>
            {currentUser()}
            {isDataDeleted ? (
              <button disabled className='header__btn disabled' onClick={() => handleLogout()}>
                Log out
              </button>
            ) : (
              <button className='header__btn' onClick={() => handleLogout()}>
                Log out
              </button>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default Header;
