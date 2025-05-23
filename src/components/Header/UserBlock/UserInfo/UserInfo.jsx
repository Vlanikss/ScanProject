// UserInfo.jsx
/**

 * @param {string} userName 
 * @param {string} userPicture 
 * @param {boolean} isLoading 
 * @returns {JSX.Element} 
 */
import React from 'react';
import {useAuth} from '../../../../hooks/AuthContext';
import styles from './UserInfo.module.scss';
import loading_icon from '../../../../assets/loading_icon.svg';

const UserInfo = ({ userName, userPicture, isLoading }) => {
  const { setIsLoggedIn } = useAuth();

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpire');
  };

  
  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfo__details}>
        {/* Display the user's name */}
        <div className={styles.userInfo__userName}>{userName}</div>
        {/* Logout link */}
        <a href="#" className={styles.userInfo__logout} onClick={handleLogout}>Выйти</a>
      </div>
      {/* Conditional rendering of loading icon or user picture */}
      {isLoading ? (
        <img src={loading_icon} alt="Loading" className={styles.userInfo__loadingIcon}/>
      ) : (
        <img src={userPicture} alt="User" className={styles.userInfo__userPicture}/>
      )}
    </div>
  );
};

export default UserInfo;