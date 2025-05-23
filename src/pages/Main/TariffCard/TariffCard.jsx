
/**
*
 * @param {string} name 
 * @param {string} description
 * @param {string} icon 
 * @param {string} colorClass 
 * @param {string} activeColorClass 
 * @param {boolean} isActive 
 * @param {boolean} isLoggedIn
 * @param {string} textColorClass 
 * @param {string} price 
 * @param {string} oldPrice 
 * @param {string} installmentText 
 * @param {string} tariffType 
 * @returns {JSX.Element} 
 */
import React from 'react';
import styles from './TariffCard.module.scss';
import Checkbox from "../../../assets/tariffs_green_checkbox_icon.svg";

const TariffCard = ({
                      name,
                      description,
                      icon,
                      colorClass,
                      activeColorClass,
                      isActive,
                      isLoggedIn,
                      textColorClass,
                      price,
                      oldPrice,
                      installmentText,
                      features,
                      tariffType,
                    }) => {

 
  return (
    <div
      className={`${styles.tariffCard} ${isActive && isLoggedIn && tariffType === 'beginner' ? activeColorClass : ''}`}>
      {}
      <div className={`${styles.tariffCard__tariffColoredBlock} ${colorClass}`}>
        <div className={styles.tariffCard__tariffNameBlock}>
          <h3 style={{color: `var(--scan-${textColorClass})`}}>{name}</h3>
          <p style={{color: `var(--scan-${textColorClass})`}}>{description}</p>
        </div>
        <div className={styles.tariffCard__tariffIconBlock}>
          <img className={styles.tariffCard__tariffIcon} src={icon} alt={`${name} icon`}/>
        </div>
      </div>

      {}
      <div className={styles.tariffCard__yourTariffBlock}>
        {isActive && isLoggedIn && (
          <div className={styles.tariffCard__yourTariffBadge}>Текущий тариф</div>
        )}
      </div>

      {}
      <div className={styles.tariffCard__tariffCardTextBlock}>
        <div className={styles.tariffCard__tariffPriceBlock}>
          <div className={styles.tariffCard__tariffPrices}>
            <h3>{price}</h3>
            {oldPrice && <p className={styles.tariffCard__lastPriceTag}>{oldPrice}</p>}
          </div>
        </div>
        {installmentText && <p className={styles.tariffCard__installmentText}>{installmentText}</p>}
      </div>

      {}
      <div>
        <p className={styles.tariffCard__cardText20px}>В тариф входит:</p>
        {features.map((feature, index) => (
       
          <div key={index} className={styles.tariffCard__tariffToIncludeLines}>
            <img className={styles.tariffCard__greenCheckbox} src={Checkbox} alt="checkbox"/>
            <p className={styles.tariffCard__cardText}>{feature}</p>
          </div>
        ))}

        {}
        <div className={styles.tariffCard__tariffButtonDiv}>
          {isActive && isLoggedIn ? (
            
            <button
              className={`${styles.tariffCard__buttonTariffs} ${styles.tariffCard__grey}`}
              id="requestDataButton">
              Перейти в личный кабинет
            </button>
          ) : (
            <button className={`${styles.tariffCard__buttonTariffs}`}
                    id="requestDataButton">
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffCard;