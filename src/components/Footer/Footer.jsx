// Footer.jsx
/**

 * @returns {JSX.Element} 
 */
import React from 'react';
import styles from './Footer.module.scss';
import FooterLogo from '../../assets/logo_white.svg';

const Footer = () => {

  return (
    <footer className={styles.footer}>
    
      <img src={FooterLogo} alt="Company logo"/>

     
      <div className={styles.footer__textBlock}>
        <p className={styles.footer__text}>г. Москва</p>
        <p className={styles.footer__text}>+7 111111111</p>
        <p className={styles.footer__text}>info@company.ru</p>
       
        <p className={styles.footer__copyright}>Copyright © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;