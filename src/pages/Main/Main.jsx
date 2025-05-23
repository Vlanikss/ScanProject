// Main.jsx
/**

 * @param {boolean} isLoggedIn 
 * @param {string} userTariff 
 * @returns {JSX.Element} 
 */
import React from 'react';
import About from "./About/About";
import Tariffs from "./Tariffs/Tariffs";
import Carousel from "../../components/Carousel/Carousel";

import styles from './Main.module.scss';

const Main = ({ isLoggedIn, userTariff }) => {

  return (
    <div className={styles.mainPage}>
      {}
      <About isLoggedIn={isLoggedIn} />
      {}
      <Carousel />
      {}
      <Tariffs isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </div>
  )
}

export default Main;