// Navbar.jsx
/**

 *
 * @returns {JSX.Element} 
 */
import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = () => {
 
  return (
    <nav className={styles.navbar}>

      <a href="/">Главная</a>

     
      <a href="#">Тарифы</a>

     
      <a href="#">FAQ</a>
    </nav>
  );
};

export default Navbar;