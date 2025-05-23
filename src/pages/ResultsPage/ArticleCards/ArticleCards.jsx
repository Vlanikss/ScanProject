// ArticleCards.jsx
/**

 * @param {Array} documentsData 
 * @returns {JSX.Element} 
 */
import React, {useEffect, useState} from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from "./ArticleCards.module.scss";
import MockArticle from '../../../assets/mock_1_picture.png';

function ArticleCards({documentsData}) {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState(2);

 
  useEffect(() => {
    if (documentsData && Array.isArray(documentsData)) {
      const transformedArticles = documentsData.map(doc => {
        const {issueDate, url, source, attributes, title, content} = doc.ok;
        const {name} = source;
        const {isTechNews, isAnnouncement, isDigest, wordCount} = attributes;
        return {
          date: new Date(issueDate).toLocaleDateString("ru-RU"),
          url,
          sourceName: name,
          isTechNews,
          isAnnouncement,
          isDigest,
          title: title.text,
          content: content.markup,
          wordCount,
          picture: MockArticle, // Placeholder image
        };
      });

      setArticles(transformedArticles);
    }
  }, [documentsData]);

 
  const showMoreArticles = () => {
    setDisplayedArticles(prev => prev + 2);
  };


  return (
    <div className={styles.articleCardsBlock}>
      {}
      <h2 className={styles.articleCards__h2}>Список документов</h2>
      {}
      <div className={styles.articleCards}>
        {articles
          .slice(0, displayedArticles) 
          .map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
      </div>
      {}
      {displayedArticles < articles.length && (
        <div className={styles.buttonDiv}>
          <button className={styles.showMore} onClick={showMoreArticles}>
            Показать больше
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleCards;