// Tariffs.jsx
/**

 * @param {boolean} isLoggedIn
 * @param {string} userTariff 
 * @returns {JSX.Element} 
 */
import React from 'react';
import TariffCard from "../TariffCard/TariffCard";
import styles from './Tariffs.module.scss';

import Lamp from "../../../assets/tariffs_icon_lamp.svg"
import Laptop from "../../../assets/tariffs_icon_laptop.svg"
import Target from "../../../assets/tariffs_icon_target.svg"

const Tariffs = ({ isLoggedIn, userTariff }) => {
  
  return (
    <div className={styles.tariffs}>
      {}
      <h2>Наши тарифы</h2>
      <div className={styles.tariffs__cards}>
        {}
        <TariffCard
          name="Beginner"
          description="Для небольшого исследования"
          icon={Lamp}
          colorClass={styles.TariffBeginnerYellow}
          activeColorClass={styles.TariffBeginnerYellowActive}
          isActive={userTariff === 'beginner'}
          isLoggedIn={isLoggedIn}
          textColorClass="black"
          price="799 ₽"
          oldPrice="1200 ₽"
          installmentText="или 150 ₽/мес. при рассрочке на 24 мес."
          features={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}
          tariffType="beginner"
        />
        {}
        <TariffCard
          name="Pro"
          description="Для HR и фрилансеров"
          icon={Target}
          colorClass={styles.TariffProGreen}
          activeColorClass={styles.TariffProGreenActive}
          isActive={userTariff === 'pro'}
          isLoggedIn={isLoggedIn}
          textColorClass="black"
          price="1 299 ₽"
          oldPrice="2 600 ₽"
          installmentText="или 279 ₽/мес. при рассрочке на 24 мес."
          features={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
        />
        {}
        <TariffCard
          name="Business"
          description="Для корпоративных клиентов"
          icon={Laptop}
          colorClass={styles.TariffBusinessBlack}
          activeColorClass={styles.TariffBusinessBlackActive}
          isActive={userTariff === 'business'}
          isLoggedIn={isLoggedIn}
          textColorClass="white"
          price="2 379 ₽"
          oldPrice="3 700 ₽"
          installmentText=""
          features={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
        />
      </div>
    </div>
  )
}

export default Tariffs;