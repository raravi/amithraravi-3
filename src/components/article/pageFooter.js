import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/pageFooter.module.css';

const PageFooter = ({
  avatar, name, web, bio, title, siteUrl, path, twitter,
}) => (
  <>
    <div className="line-red" />
    <footer className={styles.article_pageFooter}>
      <div className={styles.article_authorImage}>
        <img
          src={`/images/${avatar}`}
          alt={name}
        />
      </div>
      <div className={styles.article_authorContent}>
        <h3 className={styles.authorName}>
          Written by
          {' '}
          <a href={web}>{name}</a>
        </h3>
        <p className={styles.authorBio}>{bio}</p>
        <div className={styles.article_shareThis}>
          <div className={`${styles.col} ${styles.first}`}>
            <a
              href={`https://twitter.com/intent/tweet?text=${title.replace(/ /gi, '%20')}&url=${siteUrl}${path}&via=${twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              &nbsp;Twitter
            </a>
          </div>
          <div className={`${styles.col} ${styles.middle}`}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${path}`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
          <div className={`${styles.col} ${styles.last}`}>
            <a
              href={`https://plus.google.com/share?url=${siteUrl}${path}`}
              target="_blank"
              rel="noreferrer"
            >
              &nbsp;Google+
            </a>
          </div>
        </div>
      </div>
    </footer>
    <div className="line-red" />
  </>
);

PageFooter.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  web: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
};

export default PageFooter;
