/**
 * @returns {JSX.Element}
 */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import useSearchResults from '../../hooks/useSearchResults';

import GeneralSummaryTable from './SummaryTable/SummaryTable';
import ArticleCards from './ArticleCards/ArticleCards';

import styles from './ResultsPage.module.scss';
import ResultsLargeImg from '../../assets/search_results_large_picture.svg';
import { withAuthRedirect } from '../../hooks/withAuthRedirect'

const ResultsPage = () => {
  const location = useLocation();
 
  const searchParams = location.state?.searchParams;

  const { isLoading, histogramData, documentData, error } = useSearchResults(searchParams);



  useEffect(() => {
    console.log('Полные searchParams:', searchParams);
  }, [searchParams]);

  // Обработка ошибок
  if (error || (!isLoading && (!documentData || !Array.isArray(documentData) || documentData.length === 0))) {
    return <div className={styles.error}>Ошибка полученных данных</div>;
  }

  return (
    <div className={styles.resultPage}>
      {/* Блок с заголовком и изображением */}
      <div className={styles.resultPage__titleBlock}>
        <div>
          <h1 className={styles.resultPage__titleBlock_h1}>
            {isLoading ? 'Ищем. Скоро будут результаты' : 'Результаты поиска'}
          </h1>
          <p className={styles.resultPage__titleBlock_p}>
            {isLoading
              ? 'Поиск может занять некоторое время, просим сохранять терпение.'
              : 'Вот что удалось найти по вашему запросу.'}
          </p>
        </div>
        <img
          className={styles.resultPage__largePicture}
          src={ResultsLargeImg}
          alt="Results Page img"
        />
      </div>

      {/* Единая отрисовка таблицы вне зависимости от состояния загрузки */}
      <GeneralSummaryTable
        searchData={histogramData}
        isLoading={isLoading}
      />

      {/* Отображение карточек статей, если данные загружены */}
      {!isLoading && documentData && Array.isArray(documentData) && documentData.length > 0 && (
        <ArticleCards documentsData={documentData} />
      )}
    </div>
  );
};

export default withAuthRedirect(ResultsPage);