import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { authorize } from '../../store/reducers/authSlice';
import { changeKeystroke } from '../../store/reducers/searchSlice';

import classes from './Layout.module.scss';

const Layout: React.FC<React.ReactNode> = (props) => {
  const isAuthorized = useAppSelector((state) => state.auth.email);
  const keyStroke = useAppSelector((state) => state.search.keystroke);
  const modalIsActive = useAppSelector((state) => state.modal.contactModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (modalIsActive) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalIsActive]);

  const handleLogout = () => {
    if (isAuthorized) {
      localStorage.removeItem('email');
      dispatch(authorize(null));
    }
  };

  return (
    <div className={classes.layout}>
      <nav className={classes.nav}>
        <ul>
          {isAuthorized ? (
            <>
              <input
                type='search'
                placeholder='Поиск'
                className={classes.search}
                value={keyStroke}
                onChange={(e) => dispatch(changeKeystroke(e.target.value))}
              />
              <button onClick={handleLogout}>Выход</button>
            </>
          ) : (
            <>
              <Link to='/'>Вход</Link>
              <Link to='signup'>Регистрация</Link>
            </>
          )}
        </ul>
      </nav>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
