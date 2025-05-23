// Carousel.jsx
/**

 * @returns {JSX.Element}
 */

import React, {useRef} from 'react';
import largePicture from "../../assets/carousel_large_picture.svg";
import Magnifier from "../../assets/carousel_icon_magnifier.svg";
import Shield from "../../assets/carousel_icon_shield.svg";
import Watch from "../../assets/carousel_icon_watch.svg";
import arrowRight from "../../assets/arrow_right_icon.svg";
import styles from "../Carousel/Carousel.module.scss";


const Carousel = () => {
 
  const carouselRef = useRef(null);

 
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= window.innerWidth / 3;
    }
  };


  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += window.innerWidth / 3;
    }
  };

  return (
    <div className={styles.carouselBlock}>
      <h2 className={styles.carouselBlock__title}>Почему именно мы</h2>

      <div className={styles.carouselBlock__wrapper}>

       
        <div className={styles.carouselBlock__arrow_left} onClick={scrollLeft}>
          <img src={arrowRight} alt="arrow" role="button"/>
        </div>

        <div className={styles.carouselBlock__content} ref={carouselRef}>

       
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Shield} alt="shield icon"/>
            <p>Защита конфиденциальных сведений,
              <br/>не подлежащих разглашению по
              <br/>федеральному законодательству</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Watch} alt="watch icon"/>
            <p>Высокая и оперативная скорость
              <br/>обработки заявки</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Magnifier} alt="magnifier icon"/>
            <p>Огромная комплексная база
              <br/>данных, обеспечивающая
              <br/>объективный ответ на запрос</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Shield} alt="shield icon"/>
            <p>Защита персональных данных,
              <br/>не подлежащих разглашению по
              <br/>федеральному законодательству</p>
          </div>
          <div className={styles.carouselBlock__card}>
            <img className={styles.carouselBlock__icon} src={Watch} alt="watch icon"/>
            <p>Высокая надежность
              <br/>результатов поиска</p>
          </div>

        </div>

       
        <div className={styles.carouselBlock__arrow} onClick={scrollRight}>
          <img src={arrowRight} alt="arrow" role="button"/>
        </div>
      </div>

      
      <div className={styles.carouselBlock__image}>
        <img className={styles.carouselBlock__large_image}
             src={largePicture} alt="Carousel Scan image"/>
      </div>
    </div>
  )
}

export default Carousel

