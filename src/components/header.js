import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/header.module.css';

const Header = ({ siteUrl }) => (
  <header className={styles.topMenu}>
    <div className="inner-wrap">
      <nav role="navigation">
        <ul className={styles.topMenu_menu}>
          <li>
            <a href={`${siteUrl}/articles/`} className={styles.topMenu_item}>
              <span>Articles</span>
            </a>
          </li>
          <li>
            <a href={`${siteUrl}/`} className={styles.topMenu_siteTitle}>
              <span className={styles.firstLetter}>a</span>
              miTh
              {' '}
              <span className={styles.firstLetter}>r</span>
              aravi
            </a>
          </li>
          <li>
            <a href={`${siteUrl}/portfolio/`} className={styles.topMenu_item}>
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
};

Header.defaultProps = {
  siteUrl: '',
};

export default Header;
