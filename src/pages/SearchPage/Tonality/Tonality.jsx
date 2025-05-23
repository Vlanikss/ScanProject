// Tonality.jsx
/**

 * @param {string} tonality 
 * @param {Function} setTonality 
 * @returns {JSX.Element} 
 */
import React from 'react';
import styles from './Tonality.module.scss';

const Tonality = ({ tonality, setTonality }) => {

  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
    
      <label htmlFor="tonality">Тональность</label>

      <div className={styles.selectWrapper}>
        <select
          id="tonality"
          name="tonality"
          value={tonality}
          onChange={(e) => setTonality(e.target.value)}>

        
          <option value="Любая">Любая</option>
          {/* Option for positive tonality */}
          <option value="Позитивная">Позитивная</option>
          {/* Option for negative tonality */}
          <option value="Негативная">Негативная</option>
        </select>
      </div>
    </div>
  );
};

export default Tonality;