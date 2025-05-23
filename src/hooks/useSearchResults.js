import { useEffect, useState } from 'react';

/**
 * Хук для выполнения поиска документов и гистограммы через API Scan-Interfax
 *
 * @typedef {Object} SearchParams
 * @property {string} inn - ИНН компании (10–12 цифр)
 * @property {string} startDate - Начальная дата в формате YYYY-MM-DD
 * @property {string} endDate - Конечная дата в формате YYYY-MM-DD
 * @property {boolean} [maxFullness]
 * @property {boolean} [onlyMainRole]
 * @property {string} [tonality] - "any", "positive", "negative"
 * @property {boolean} [onlyWithRiskFactors]
 * @property {number} [limit]
 * @property {string} [sortType] - например, "sourceInfluence"
 * @property {string} [sortDirectionType] - "asc" или "desc"
 * @property {string} [intervalType] - например, "month"
 */

/**
 * @param {SearchParams} searchParams - Параметры поиска
 */
const useSearchResults = (searchParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [histogramData, setHistogramData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [error, setError] = useState(null);

  // Моковые данные на случай ошибок
  const mockHistogram = {
    timeIntervals: [
      {
        intervalStart: '2024-08-01T00:00:00',
        totalDocuments: 5,
        riskFactors: 1,
      },
    ],
  };

  const mockDocuments = [
    {
      encodedId: 'mock-123',
      title: 'Пример новости',
      date: '2024-08-15T12:00:00Z',
    },
  ];

  // Валидация параметров поиска
  const validateSearchParams = (params) => {
    if (!params) throw new Error('Параметры поиска не указаны');

    const { inn, startDate, endDate } = params;

    if (!inn || !startDate || !endDate) {
      throw new Error('Необходимо указать ИНН и диапазон дат');
    }

    if (!/^\d{10,12}$/.test(inn)) {
      throw new Error('ИНН должен содержать 10 или 12 цифр');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (isNaN(start.getTime())) throw new Error('Неверный формат даты начала');
    if (isNaN(end.getTime())) throw new Error('Неверный формат даты окончания');
    if (start > end) throw new Error('Дата начала не может быть позже даты окончания');
    if (end > now) throw new Error('Дата окончания не может быть в будущем');

    return true;
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      setError(null);

      try {
        // Получаем значения из searchParams
        const inn = searchParams?.searchContext?.targetSearchEntitiesContext?.targetSearchEntities?.[0]?.inn;
        const startDate = searchParams?.issueDateInterval?.startDate;
        const endDate = searchParams?.issueDateInterval?.endDate;

        // Валидируем входные данные
        validateSearchParams({ inn, startDate, endDate });

        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Требуется авторизация');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        // Формируем тело запроса
        const requestBody = {
          issueDateInterval: {
            startDate,
            endDate,
          },
          histogramTypes: ['TotalDocuments', 'RiskFactors'],
          searchContext: {
            targetSearchEntitiesContext: {
              targetSearchEntities: [
                {
                  type: 'company',
                  inn,
                  maxFullness: searchParams.maxFullness ?? true,
                },
              ],
              onlyMainRole: searchParams.onlyMainRole ?? true,
              tonality: searchParams.tonality ?? 'any',
              onlyWithRiskFactors: searchParams.onlyWithRiskFactors ?? false,
            },
            themesFilter: {
              and: [],
              or: [],
              not: [],
            },
          },
          limit: searchParams.limit ?? 100,
          sortType: searchParams.sortType ?? 'sourceInfluence',
          sortDirectionType: searchParams.sortDirectionType ?? 'desc',
          intervalType: searchParams.intervalType ?? 'month',
        };

        // Запрос на гистограмму
        const histogramResponse = await fetch(
          'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms ', 
          {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
            signal,
          }
        );

        if (!histogramResponse.ok) {
          if (signal.aborted) return; 

          let errorData = {};
          try {
            errorData = await histogramResponse.json();
          } catch (e) {
            errorData = { message: 'Ошибка парсинга ответа сервера' };
          }

          throw new Error(
            errorData.message ||
              errorData.title ||
              `Ошибка при запросе гистограммы: ${histogramResponse.status}`
          );
        }

      if (signal.aborted) return;
const histogramData = await histogramResponse.json();
setHistogramData(histogramData);

        // Запрос на поиск документов
        const searchResponse = await fetch(
          'https://gateway.scan-interfax.ru/api/v1/objectsearch ', 
          {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
            signal,
          }
        );

        if (!searchResponse.ok) {
          if (signal.aborted) return;

          let errorData = {};
          try {
            errorData = await searchResponse.json();
          } catch (e) {
            errorData = { message: 'Ошибка получения данных о документах' };
          }

          console.warn('Ошибка поиска документов:', errorData.message);
        }

        const searchData = await searchResponse.json();
        const publicationIds = searchData.items?.map((item) => item.encodedId) || [];

        // Получаем документы
        let documents = [];
        if (publicationIds.length > 0) {
          const documentsResponse = await fetch(
            'https://gateway.scan-interfax.ru/api/v1/documents ',
            {
              method: 'POST',
              headers,
              body: JSON.stringify({ ids: publicationIds.slice(0, 100) }),
              signal,
            }
          );

          if (!documentsResponse.ok) {
            if (signal.aborted) return;

            let errorData = {};
            try {
              errorData = await documentsResponse.json();
            } catch (e) {
              errorData = { message: 'Ошибка загрузки документов' };
            }

            console.warn('Ошибка получения документов:', errorData.message);
            documents = mockDocuments;
          } else {
            documents = await documentsResponse.json();
          }
        }

      if (!isMounted || signal.aborted) return;

setHistogramData(histogramData);
setDocumentData(documents);
      } catch (err) {
        if (!isMounted || signal.aborted) return;

        console.error('API Error:', err.message);
        setError(err.message);

        // Показываем моковые данные даже при ошибке
        setHistogramData(mockHistogram);
        setDocumentData(mockDocuments);
      } finally {
        if (!isMounted || signal.aborted) return;
        setIsLoading(false);
      }
    };

    // Выполняем запрос только если все обязательные поля заданы
    const currentInn = searchParams?.searchContext?.targetSearchEntitiesContext?.targetSearchEntities?.[0]?.inn;
    const currentStartDate = searchParams?.issueDateInterval?.startDate;
    const currentEndDate = searchParams?.issueDateInterval?.endDate;

    if (currentInn && currentStartDate && currentEndDate) {
      fetchData();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [searchParams]);

  return { isLoading, histogramData, documentData, error };
};

export default useSearchResults;