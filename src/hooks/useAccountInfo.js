import { useEffect, useState } from 'react';

// Глобальный кэш вне хука
let cachedData = null;

export const useAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState(cachedData);
  const [isLoading, setIsLoading] = useState(!cachedData);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    if (cachedData) {
      if (!accountInfo) setAccountInfo(cachedData);
      if (isLoading) setIsLoading(false);
      return; 
    }

    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Требуется авторизация');

        const url = 'https://gateway.scan-interfax.ru/api/v1/account/info '; 

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }

        const data = await response.json();

        cachedData = {
          usedCompanyCount: data.eventFiltersInfo.usedCompanyCount,
          companyLimit: data.eventFiltersInfo.companyLimit,
        };

        if (isMounted) {
          setAccountInfo(cachedData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
        console.error('Ошибка:', err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { accountInfo, isLoading, error };
};