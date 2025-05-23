import React, { useEffect } from 'react';
import Loading from '../../../../assets/loading_icon.svg';
import styles from './UserActions.module.scss';
import { useAccountInfo } from '../../../../hooks/useAccountInfo';

const UserActions = () => {
  const { accountInfo, isLoading, error } = useAccountInfo();

  if (error) {
    console.error('Ошибка получения данных пользователя:', error);
  }

  return (
    <div className={styles.userActions__rectangle}>
      {isLoading ? (
        <img src={Loading} alt="Loading" className={styles.userActions__loading} />
      ) : (
        <div className={styles.userActions__data}>
          <div className={styles.userActions__numberItem}>Использовано компаний</div>
          <div className={styles.userActions__usedCompaniesNumber}>
            {accountInfo?.usedCompanyCount || 0}
          </div>
          <div className={styles.userActions__numberItem}>Лимит по компаниям</div>
          <div className={styles.userActions__limitCompaniesNumber}>
            {accountInfo?.companyLimit || 0}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;