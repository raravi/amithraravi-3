/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import Footer from './footer';
import '../styles/app.css';
import styles from '../styles/layout.module.css';
import stylesHeader from '../styles/header.module.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  function stickyHeading() {
    // eslint-disable-next-line no-undef
    const scroll = window.pageYOffset || document.body.scrollTop;

    // eslint-disable-next-line no-undef
    const header = document.querySelector(`.${stylesHeader.topMenu}`);
    const headerDiv1 = header.querySelector('.div-20-high');
    const headerDiv2 = header.querySelector('.line-red');

    // eslint-disable-next-line no-undef
    // const menuButton = document.querySelector(".sliding-menu-button");

    /* const windowWidth = Math.max(
      // eslint-disable-next-line no-undef
      document.documentElement.clientWidth,
      // eslint-disable-next-line no-undef
      window.innerWidth || 0,
    );

    let menuButtonTop = 6;
    if (windowWidth < 450) {
      menuButtonTop = 11;
    }
    if (windowWidth < 350) {
      menuButtonTop = 13;
    } */

    if (scroll >= 10) {
      header.style.paddingTop = '10px';
      header.style.paddingBottom = '10px';
      header.style.backgroundColor = '#F9D64C';
      header.style.boxShadow = '0 6px 20px 0 rgba(0, 0, 0, 0.19)';
      headerDiv1.style.display = 'none';
      headerDiv2.style.display = 'none';
      // menuButton.style.top = menuButtonTop + "px";
    } else {
      header.style.paddingTop = '';
      header.style.paddingBottom = '';
      header.style.backgroundColor = '';
      header.style.boxShadow = '';
      headerDiv1.style.display = '';
      headerDiv2.style.display = '';
      // menuButton.style.top = "";
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.addEventListener('load', stickyHeading);
    // eslint-disable-next-line no-undef
    window.addEventListener('scroll', stickyHeading);

    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener('load', stickyHeading);
      // eslint-disable-next-line no-undef
      window.removeEventListener('scroll', stickyHeading);
    };
  });

  return (
    <>
      <Header siteUrl={data.site.siteMetadata.siteUrl} />
      <div
        className={styles.container}
      >
        <div className="inner-wrap">
          {children}
          <Footer siteUrl={data.site.siteMetadata.siteUrl} />
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
