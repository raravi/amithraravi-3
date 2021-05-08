import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../styles/footer.module.css';

const Footer = ({ siteUrl }) => (
  <footer role="contentinfo" className={styles.siteFooter}>
    <nav role="navigation" className={styles.siteFooter_bottomMenu}>
      <ul className="menu-item">
        <li><a href={`${siteUrl}/`}>Home</a></li>
        <li><a href={`${siteUrl}/about/`}>About Me</a></li>
        <li><a href={`${siteUrl}/terms/`}>Terms</a></li>
      </ul>
    </nav>
    <div className="line-red" />
    <p className={styles.siteFooter_copyright}>
      ©
      {' '}
      {new Date().getFullYear()}
      {' '}
      <a href={`${siteUrl}`}>Amith Raravi</a>
      {' '}
      powered by
      {' '}
      <a href="https://www.gatsbyjs.org" rel="nofollow">Gatsby</a>
      .
    </p>
  </footer>
);

Footer.propTypes = {
  siteUrl: PropTypes.string.isRequired,
};

export default Footer;
