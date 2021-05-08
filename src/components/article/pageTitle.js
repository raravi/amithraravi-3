import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as styles from '../../styles/pageTitle.module.css';

const PageTitle = ({ title, date, datePublished }) => (
  <>
    <div className="line-red" />
    <div className={styles.article_pageTitle}>
      <h1>{title}</h1>
    </div>
    <div className={styles.article_pageDate}>
      <p>
        <time dateTime={moment(date).format()}>
          {datePublished}
        </time>
      </p>
    </div>
    <div className="line-red" />
  </>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  datePublished: PropTypes.string.isRequired,
};

export default PageTitle;
