/**
 * @param {boolean} isLoggedIn 
 * @param {string} userName 
 * @param {string} userPicture 
 * @param {Function} setUserName 
 * @param {Function} setUserPicture 
 * @returns {JSX.Element}
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import UserBlock from './UserBlock/UserBlock';
import { useAuth } from '../../hooks/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './Header.module.scss';
import greenLogo from '../../assets/logo_green.svg';
import whiteLogo from '../../assets/logo_white.svg';
import fallout_menu_icon from '../../assets/fallout_menu_icon.svg';
import close_icon from '../../assets/closing_icon.svg';
import clsx from 'clsx';

const AuthButtons = ({ onCloseMenu = () => {} }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
    onCloseMenu();
  };

  return (
    <div className={styles.header__regBlock}>
      <a href="/auth" className={styles.header__regLink}>Зарегистрироваться</a>
      <button
        className={styles.header__loginButton}
        id="loginButton"
        onClick={handleLoginClick}
      >
        Войти
      </button>
    </div>
  );
};

const Header = ({ isLoggedIn, userName, userPicture, setUserName, setUserPicture }) => {
  const { setIsLoggedIn } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 1360;

  const logoSrc = isMenuVisible && isMobile ? whiteLogo : greenLogo;
  const headerClasses = clsx({
    'menu-visible': isMenuVisible && isMobile,
  });

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleLoginAndCloseMenu = () => {
    handleLoginClick();
    setIsMenuVisible(false);
  };

  // Проверка токена при монтировании и периодически
  useEffect(() => {
    const checkAuth = () => {
      const tokenExpire = localStorage.getItem('tokenExpire');
      const now = new Date().getTime();

      if (!tokenExpire || Number(tokenExpire) <= now) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
      }
    };

    checkAuth(); // Однократно при монтировании
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // раз в 5 минут

    return () => clearInterval(intervalId);
  }, [setIsLoggedIn]);

  return (
    <header className={headerClasses}>
      <div className={styles.header__content}>
        <img className={styles.header__logo} src={logoSrc} alt="Scan logo" />

        {!isMobile && <Navbar />}

        {/* Десктоп: отображение UserBlock */}
        {!isMobile && isLoggedIn && (
          <div className={styles.header__rightSection}>
            <UserBlock
              isLoggedIn={isLoggedIn}
              userName={userName}
              userPicture={userPicture}
              setUserName={setUserName}
              setUserPicture={setUserPicture}
            />
          </div>
        )}

        {/* Мобильное меню: UserBlock или кнопки авторизации */}
        {isMobile && !isMenuVisible && (
          <UserBlock
            isLoggedIn={isLoggedIn}
            userName={userName}
            userPicture={userPicture}
            setUserName={setUserName}
            setUserPicture={setUserPicture}
            isMenuVisible={isMenuVisible}
            isMobile={isMobile}
          />
        )}

        {/* Иконка меню на мобильных устройствах */}
        {isMobile && (
          <img
            src={isMenuVisible ? close_icon : fallout_menu_icon}
            alt="Menu"
            className={styles.header__logo_menuIcon}
            onClick={toggleMenuVisibility}
          />
        )}

        {/* Кнопки входа и регистрации на десктопе */}
        {!isLoggedIn && !isMobile && (
          <div className={styles.header__rightSection}>
            <AuthButtons />
          </div>
        )}
      </div>

      {/* Мобильное выпадающее меню */}
      {isMenuVisible && isMobile && (
        <div className={styles.header__dropdownMenu}>
          <Navbar key={isLoggedIn ? 'nav-auth' : 'nav-guest'} />
          {isLoggedIn ? (
            <UserBlock
              isLoggedIn={isLoggedIn}
              userName={userName}
              userPicture={userPicture}
              setUserName={setUserName}
              setUserPicture={setUserPicture}
              isMenuVisible={isMenuVisible}
              isMobile={isMobile}
            />
          ) : (
            <AuthButtons onCloseMenu={() => setIsMenuVisible(false)} />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;