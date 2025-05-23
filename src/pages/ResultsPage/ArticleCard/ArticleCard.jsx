// ArticleCard.jsx
/**

 * @param {string} date 
 * @param {string} url 
 * @param {string} sourceName 
 * @param {boolean} isTechNews
 * @param {boolean} isAnnouncement
 * @param {boolean} isDigest
 * @param {string} title 
 * @param {string} content 
 * @param {number} wordCount 
 * @param {string} picture
 * @returns {JSX.Element} 
 */
import React, {useEffect, useState} from 'react';
import styles from './ArticleCard.module.scss';
import {cleanHtmlContent} from '../../../utils/utils';

const ArticleCard = ({ date, url, sourceName, isTechNews, isAnnouncement, isDigest, title, content, wordCount, picture }) => {
  const [cleanContent, setCleanContent] = useState('');

  
  useEffect(() => {
    setCleanContent(cleanHtmlContent(content));
  }, [content]);


  const tagLabel = isTechNews ? "Технические новости" : isAnnouncement ? "Анонсы и события" : "Сводки новостей";


  return (
    <div className={styles.articleCard}>
      {/* Article information with date and source */}
      <div className={styles.articleInfo}>
        <span className={styles.articleDate}>{date}</span>
        <a href={url} className={styles.articleSource} target="_blank" rel="noopener noreferrer">
          {sourceName}
        </a>
      </div>
      {/* Article title */}
      <h3 className={styles.articleTitle}>{title}</h3>
      {/* Article type tag */}
      <div className={styles.tag}>{tagLabel}</div>
      {/* Article image */}
      <img src={picture} alt="Article" className={styles.articlePicture} />
      {/* Article content snippet */}
      <p className={styles.articleContent}>{cleanContent}</p>
      {/* Article footer with link to full article and word count */}
      <div className={styles.articleFooter}>
        <a href={url} className={styles.readMore} target="_blank" rel="noopener noreferrer">
          Читать в источнике
        </a>
        <span className={styles.wordCount}>{wordCount} слова</span>
      </div>
    </div>
  );
};

export default ArticleCard;