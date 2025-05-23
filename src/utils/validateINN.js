// src/utils/validateINN.js
const validateINN = (inn) => {
  if (!inn || inn.trim() === '') {
    return 'ИНН обязателен для заполнения';
  }

  if (!/^\d+$/.test(inn)) {
    return 'ИНН должен содержать только цифры';
  }

  if (inn.length !== 10 && inn.length !== 12) {
    return 'ИНН должен содержать 10 или 12 цифр';
  }

  return '';
};

export default validateINN;