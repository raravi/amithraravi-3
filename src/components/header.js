import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/header.module.css';

const Header = ({ siteUrl, ran }) => (
  <header className={styles.topMenu}>
    <div className="inner-wrap">
      <nav role="navigation">
        <ul className={styles.topMenu_menu}>
          <li>
            <a
              href={`${siteUrl}/articles/`}
              className={ran ? styles.topMenu_item : `${styles.topMenu_item} ${styles.topMenu_item___animation}`}
            >
              <span>Articles</span>
            </a>
          </li>
          <li>
            <a
              href={`${siteUrl}/`}
              className={ran ? styles.topMenu_siteTitle : `${styles.topMenu_siteTitle} ${styles.topMenu_siteTitle___animation}`}
            >
              <span className={styles.firstLetter}>a</span>
              miTh
              {' '}
              <span className={styles.firstLetter}>r</span>
              aravi
            </a>
          </li>
          <li>
            <a
              href={`${siteUrl}/portfolio/`}
              className={ran ? styles.topMenu_item : `${styles.topMenu_item} ${styles.topMenu_item___animation}`}
            >
              <span>Portfolio</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="div-20-high" />
      <div className="line-red" />
    </div>
  </header>
);

Header.propTypes = {
  siteUrl: PropTypes.string,
  ran: PropTypes.node.isRequired,
};

Header.defaultProps = {
  siteUrl: '',
};

export default Header;
