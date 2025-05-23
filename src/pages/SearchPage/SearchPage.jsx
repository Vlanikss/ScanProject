// src/pages/SearchPage/SearchPage.jsx
import React from 'react';
import CompanyINN from './CompanyINN/CompanyINN';
import Tonality from './Tonality/Tonality';
import DocumentCount from './DocumentCount/DocumentCount';
import DateInput from './DateInput/DateInput';
import CheckboxBlock from './CheckboxBlock/CheckboxBlock';
import styles from './SearchPage.module.scss';

import LargePicture from '../../assets/search_page_large_picture.svg';
import Folders from '../../assets/search_page_small_picture_folders.svg';
import Documents from '../../assets/search_page_small_picture_sheet.svg';
import { useSearchForm } from '../../hooks/useSearchForm';
import { withAuthRedirect } from '../../hooks/withAuthRedirect'

const SearchPage = () => {
  const {
    companyINN,
    setCompanyINN,
    tonality,
    setTonality,
    documentCount,
    setDocumentCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    checkboxStates,
    handleCheckboxChange,
    isFormValid,
    navigate,
    submitted,
    setSubmitted,
  } = useSearchForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); // Активируем валидацию

    if (!isFormValid) {
      console.log('Форма не валидна.');
      return;
    }

    const {
      maxCompleteness,
      mainRole,
      riskFactorsOnly,
      includeMarketNews,
      includeAnnouncements,
      includeNewsSummaries,
    } = checkboxStates;

    let apiTonality;
    switch (tonality) {
      case 'Любая':
        apiTonality = 'any';
        break;
      case 'Позитивная':
        apiTonality = 'positive';
        break;
      case 'Негативная':
        apiTonality = 'negative';
        break;
      default:
        apiTonality = 'any';
    }

    const searchParams = {
      issueDateInterval: {
        startDate: `${startDate}T00:00:00+03:00`,
        endDate: `${endDate}T23:59:59+03:00`,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            { type: 'company', inn: companyINN, maxFullness: maxCompleteness },
          ],
          onlyMainRole: mainRole,
          tonality: apiTonality,
          onlyWithRiskFactors: riskFactorsOnly,
        },
      },
      attributeFilters: {
        excludeTechNews: !includeMarketNews,
        excludeAnnouncements: !includeAnnouncements,
        excludeDigests: !includeNewsSummaries,
      },
      limit: Number(documentCount),
      sortType: 'sourceInfluence',
      sortDirectionType: 'desc',
      intervalType: 'month',
      histogramTypes: ['TotalDocuments', 'RiskFactors'],
    };

    navigate('/results', { state: { searchParams } });
  };

  return (
    <div className={styles.searchContent}>
      {/* Заголовок */}
      <div className={styles.searchTitleBlock}>
        <div>
          <h1 className={styles.h1SearchPage}>Найдите необходимые <br />данные в пару кликов.</h1>
          <p className={styles.pSearchPageTitleBlock}>
            Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск
          </p>
        </div>
        <img className={styles.searchPageSmallPictureSheet} src={Documents} alt="Paper image" />
        <img className={styles.searchPageSmallPictureFolders} src={Folders} alt="Folders image" />
      </div>

      {/* Форма */}
      <div className={styles.searchBlock}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.leftPartSearchForm}>
            <CompanyINN
              companyINN={companyINN}
              setCompanyINN={setCompanyINN}
              submitted={submitted}
            />
            <Tonality tonality={tonality} setTonality={setTonality} />
            <DocumentCount documentCount={documentCount} setDocumentCount={setDocumentCount} />
            <DateInput startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>

          <div className={styles.rightPartSearchForm}>
            <CheckboxBlock checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange} />
            <div className={styles.rightPartSubmitButtonBlock}>
              <button className={styles.button} type="submit" disabled={!isFormValid}>
                Поиск
              </button>
              <p className={styles.starMessage}>* Обязательные к заполнению поля</p>
            </div>
          </div>
        </form>
        <img className={styles.searchPageLargePicture} src={LargePicture} alt="SearchPage image" />
      </div>
    </div>
  );
};

export default withAuthRedirect(SearchPage);