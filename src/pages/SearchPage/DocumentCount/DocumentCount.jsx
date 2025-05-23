import React, { useState, useEffect } from 'react';
import styles from './DocumentCount.module.scss';

const DocumentCount = ({ documentCount, setDocumentCount, submitted }) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || submitted) {
      validateDocumentCount();
    }
  }, [documentCount, touched, submitted]);

  const validateDocumentCount = () => {
    const count = Number(documentCount);

    if (!documentCount) {
      if (submitted) {
        setError("Обязательное поле");
      }
    } else if (isNaN(count) || count < 1 || count > 1000) {
      setError("Введите корректные данные (от 1 до 1000)");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDocumentCount(newValue);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    validateDocumentCount();
  };

  return (
    <div className={`${styles.formField} ${styles.formFieldInputs}`}>
      <label htmlFor="documentCount">
        Количество документов в выдаче
        <span className={styles.requiredAsterisk}>*</span>
      </label>
      <input
        type="number"
        id="documentCount"
        name="documentCount"
        min="1"
        max="1000"
        className={error ? styles.inputError : ''}
        value={documentCount}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="от 1 до 1000"
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default DocumentCount;