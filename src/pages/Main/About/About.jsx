// About.jsx
/**

 *
 * @param {boolean} isLoggedIn 
 * @returns {JSX.Element} 
 */
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './About.module.scss';
import AboutPicture from "../../../assets/about_picture.jpg"

const About = ({ isLoggedIn }) => {
  const navigate = useNavigate();

 
  const handleRequestDataClick = () => {
 
    if (isLoggedIn) {
      navigate('/search');
    } else {
      navigate('/auth');
    }
  };


  return (
    <div className={styles.aboutBlock}>
      {}
      <div className={styles.aboutBlock__info}>
        <h1 className={styles.aboutBlock__h1}>Сервис по поиску<br />публикаций <br />о компании<br />по его ИНН</h1>
        <p className={styles.aboutBlock__p}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
        {}
        {isLoggedIn && <button
          className={styles.aboutBlock__button}
          id="requestDataButton"
          onClick={handleRequestDataClick}>
          Запросить данные
        </button>}
      </div>
      {}
      <img className={styles.aboutBlock__image} src={AboutPicture} alt="About Scan image" />
    </div>
  )
}

export default About;