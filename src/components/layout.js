/* global document, window */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import SlidingMenu from './slidingMenu';
import Footer from './footer';
import '../styles/app.css';
import styles from '../styles/layout.module.css';
import stylesHeader from '../styles/header.module.css';
import stylesSlidingMenu from '../styles/slidingMenu.module.css';

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
    if (window.runOnce === undefined) {
      const topMenuItems = document.querySelectorAll(`.${stylesHeader.topMenu_item}`);
      topMenuItems[0].classList.add('topMenu_item___animation');
      topMenuItems[1].classList.add('topMenu_item___animation');

      const topMenuSiteTitle = document.querySelector(`.${stylesHeader.topMenu_siteTitle}`);
      topMenuSiteTitle.classList.add('topMenu_siteTitle___animation');

      const slidingMenuButton = document.querySelector(`.${stylesSlidingMenu.slidingMenuButton}`);
      slidingMenuButton.classList.add('slidingMenuButton___animation');

      window.runOnce = true;
    } else {
      const topMenuItems = document.querySelectorAll(`.${stylesHeader.topMenu_item}`);
      topMenuItems[0].style.opacity = 1;
      topMenuItems[1].style.opacity = 1;

      const topMenuSiteTitle = document.querySelector(`.${stylesHeader.topMenu_siteTitle}`);
      topMenuSiteTitle.style.opacity = 1;
    }
  }, []);

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
      <Header siteUrl={site.siteMetadata.siteUrl} />
      <SlidingMenu />
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
