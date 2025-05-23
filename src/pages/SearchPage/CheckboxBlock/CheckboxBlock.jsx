// CheckboxBlock.jsx
/**

 * @param {Object} checkboxStates 
 * @param {Function} handleCheckboxChange 
 * @returns {JSX.Element} 
 */
import React from 'react';
import styles from './CheckboxBlock.module.scss';

const CheckboxBlock = ({ checkboxStates, handleCheckboxChange }) => {
  
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  
  return (
    <div className={styles.rightPartSearchCheckboxBlock}>
      {}
      {Object.keys(checkboxStates).map((key) => (
        <div key={key} className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            name={key}
            checked={checkboxStates[key]}
            onChange={handleCheckboxChange}
          />
          
          {}
          <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? styles.checkedLabel : ""}>
            <span className={styles.customCheckbox}></span>
            <span className={styles.labelText}>{labels[key]}</span>
          </label>
        </div>
      ))}
    </div>
  );

};

export default CheckboxBlock;
