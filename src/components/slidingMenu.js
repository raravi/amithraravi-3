/* global document */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styles from '../styles/slidingMenu.module.css';

const SlidingMenu = ({ ran }) => {
  const { site, menu } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          imagekitUrl
          title
        }
      }
      menu: allNavigationYaml {
        nodes {
          id
          title
          url
          excerpt
          image
        }
      }
    }
  `);

  useEffect(() => {
    const menuElement = document.querySelector('#js-menu');
    const menuLinks = document.querySelectorAll('.js-menu-link');
    const menuButton = document.querySelector('#js-menu-trigger');
    const body = document.querySelector('body');

    menuLinks.forEach((menuLink) => menuLink.addEventListener('click', () => {
      body.classList.toggle('no-scroll');
      menuElement.classList.toggle(`${styles.isVisible}`);
      menuButton.classList.toggle(`${styles.slide}`);
      menuButton.classList.toggle(`${styles.close}`);
    }));
    menuButton.addEventListener('click', (event) => {
      body.classList.toggle('no-scroll');
      menuElement.classList.toggle(`${styles.isVisible}`);
      menuButton.classList.toggle(`${styles.slide}`);
      menuButton.classList.toggle(`${styles.close}`);
      event.preventDefault();
    });
  }, []);

  return (
    <>
      <nav role="navigation" id="js-menu" className={styles.slidingMenuContent}>
        <h5>
          { site.siteMetadata.title }
          <span>Table of Contents</span>
        </h5>
        <ul className={styles.menuItem}>
          {
            menu.nodes.map((node) => (
              <li key={node.id}>
                <a
                  href={`${site.siteMetadata.siteUrl}${node.url}`}
                  className="js-menu-link"
                >
                  <img
                    src={`${site.siteMetadata.imagekitUrl}/tr:w-100,h-63/images/${node.image}`}
                    srcSet={`${site.siteMetadata.imagekitUrl}/tr:w-100,h-63/images/${node.image} 1x, ${site.siteMetadata.imagekitUrl}/tr:w-200,h-125/images/${node.image} 2x`}
                    alt="teaser"
                    className={styles.teaser}
                  />
                  <div className={styles.title}>{ node.title }</div>
                  <p className={styles.excerpt}>{ node.excerpt }</p>
                </a>
              </li>
            ))
          }
        </ul>
      </nav>
      <button
        type="button"
        id="js-menu-trigger"
        className={
          ran
            ? `${styles.slidingMenuButton} ${styles.linesButton} ${styles.x2}`
            : `${styles.slidingMenuButton} ${styles.linesButton} ${styles.x2} ${styles.slidingMenuButton___animation}`
        }
        aria-label="Toggle Navigation"
      >
        <span className={styles.navLines} />
      </button>
    </>
  );
};

SlidingMenu.propTypes = {
  ran: PropTypes.node.isRequired,
};

export default SlidingMenu;
