// src/pages/SearchPage/CompanyINN/CompanyINN.jsx
import React, { useState, useEffect } from 'react';
import styles from './CompanyINN.module.scss';
import validateINN from '../../../utils/validateINN';

const CompanyINN = ({ companyINN, setCompanyINN, submitted }) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && (touched || submitted)) {
      const errorText = validateINN(companyINN);
      setError(errorText);
    }

    return () => {
      isMounted = false;
    };
  }, [companyINN, touched, submitted]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCompanyINN(value);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    if (touched) {
      setError(validateINN(companyINN));
    }
  };

  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
      <label htmlFor="companyINN">
        ИНН компании
        <span className={styles.requiredAsterisk}>*</span>
      </label>
      <input
        type="text"
        id="companyINN"
        name="companyINN"
        className={error ? styles.inputError : ''}
        value={companyINN}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="10 или 12 цифр"
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default CompanyINN;