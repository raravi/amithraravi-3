// import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import style from '../styles/header.module.css';

const Header = ({ siteUrl }) => (
  <header className={style.topMenu}>
    <div className={style.topMenu_innerWrap}>
      <nav role="navigation">
        <ul className={style.topMenu_menu}>
          <li>
            <a href={`${siteUrl}/articles/`} className={style.topMenu_item}>
              <span>Articles</span>
            </a>
          </li>
          <li>
            <a href={`${siteUrl}/`} className={style.topMenu_siteTitle}>
              <span className={style.firstLetter}>a</span>
              miTh
              {' '}
              <span className={style.firstLetter}>r</span>
              aravi
            </a>
          </li>
          <li>
            <a href={`${siteUrl}/portfolio/`} className={style.topMenu_item}>
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
