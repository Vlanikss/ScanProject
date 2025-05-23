import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import { format } from 'date-fns';
import styles from './DateInput.module.scss';

const DateInput = ({ startDate, setStartDate, endDate, setEndDate, submitted }) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || submitted) {
      validateDateRange();
    }
  }, [startDate, endDate, touched, submitted]);

  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      if (submitted) setError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
      setError("Введите корректные данные");
    } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError('');
    }
  };

  const handleStartDateChange = (date) => {
    if (date) {
      setStartDate(format(date, 'yyyy-MM-dd'));
      setTouched(true);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      setEndDate(format(date, 'yyyy-MM-dd'));
      setTouched(true);
    }
  };

  return (
    <div className={styles.formField}>
      <label htmlFor="startDate">
        Диапазон поиска <span className={styles.requiredAsterisk}>*</span>
      </label>

      <div className={styles.formFieldDateInputs}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <div className={styles.dateInputContainer}>
            <DatePicker
              label="Дата начала"
              value={startDate ? new Date(startDate) : null}
              onChange={handleStartDateChange}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField {...params} error={!!error} fullWidth />
              )}
            />

            <DatePicker
              label="Дата конца"
              value={endDate ? new Date(endDate) : null}
              onChange={handleEndDateChange}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField {...params} error={!!error} fullWidth />
              )}
            />
          </div>
        </LocalizationProvider>

        {error && <div className={`${styles.dateErrorMessage} ${styles.error}`}>{error}</div>}
      </div>
    </div>
  );
};

export default DateInput;
