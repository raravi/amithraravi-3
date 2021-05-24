/* global document, window */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import SlidingMenu from './slidingMenu';
import Footer from './footer';
import '../styles/app.css';
import * as styles from '../styles/layout.module.css';
import * as stylesHeader from '../styles/header.module.css';

const Layout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const [ran, setRan] = useState(typeof window !== 'undefined' ? window.ranOnce : false);

  useEffect(() => {
    if (window.ranOnce !== true) {
      setTimeout(() => { window.ranOnce = true; setRan(() => true); }, 2000);
    }
  }, []);

  function stickyHeading() {
    const scroll = window.pageYOffset || document.body.scrollTop;

    const header = document.querySelector(`.${stylesHeader.topMenu}`);
    const headerDiv1 = header.querySelector('.div-20-high');
    const headerDiv2 = header.querySelector('.line-red');

    const menuButton = document.querySelector('#js-menu-trigger');

    const windowWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );

    let menuButtonTop = 6;
    if (windowWidth < 450) {
      menuButtonTop = 11;
    }
    if (windowWidth < 350) {
      menuButtonTop = 13;
    }

    if (scroll >= 10) {
      header.style.paddingTop = '10px';
      header.style.paddingBottom = '10px';
      header.style.backgroundColor = '#F9D64C';
      header.style.boxShadow = '0 6px 20px 0 rgba(0, 0, 0, 0.19)';
      headerDiv1.style.display = 'none';
      headerDiv2.style.display = 'none';
      menuButton.style.top = `${menuButtonTop}px`;
    } else {
      header.style.paddingTop = '';
      header.style.paddingBottom = '';
      header.style.backgroundColor = '';
      header.style.boxShadow = '';
      headerDiv1.style.display = '';
      headerDiv2.style.display = '';
      menuButton.style.top = '';
    }
  }

  useEffect(() => {
    window.addEventListener('load', stickyHeading);
    window.addEventListener('scroll', stickyHeading);

    return () => {
      window.removeEventListener('load', stickyHeading);
      window.removeEventListener('scroll', stickyHeading);
    };
  });

  return (
    <>
      <Header siteUrl={site.siteMetadata.siteUrl} ran={ran} />
      <SlidingMenu ran={ran} />
      <div
        className={styles.container}
      >
        <div className="inner-wrap">
          {children}
          <Footer siteUrl={site.siteMetadata.siteUrl} />
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
