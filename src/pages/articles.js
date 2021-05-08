/* global document */
import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import Layout from '../components/layout';
import SEO from '../components/seo';
import * as styles from '../styles/articles.module.css';

const ArticlesPage = () => {
  const { site, posts } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        posts: allMarkdownRemark(
          sort: {
            fields: [frontmatter___date]
            order: DESC
          }
          filter: {
            fields: {
              sourceName: {eq: "posts"}
            }
          }
        ) {
          nodes {
            id
            frontmatter {
              title
              teaser
              categories
              date
              datePublished: date(formatString: "MMMM D, YYYY")
              excerpt
            }
            fields {
              slug
            }
          }
        }
      }
    `,
  );

  useEffect(() => {
    // eslint-disable-next-line global-require
    const AnimOnScroll = typeof window !== 'undefined' ? require('../components/animOnScroll') : null;

    const buttonAll = document.querySelector('.button-all');
    const buttonTech = document.querySelector('.button-tech');
    const buttonPersonal = document.querySelector('.button-personal');
    const articlesAll = document.querySelectorAll(`.${styles.col}`);
    const articlesTech = document.querySelectorAll('.tech');
    const articlesPersonal = document.querySelectorAll('.personal');
    const articleTiles = document.querySelectorAll(`.${styles.articleTile}`);
    const articleTilesGrid = document.querySelector(`.${styles.articlesTilesGrid}`);
    const tileGrid = `.${styles.articlesTilesGrid}`;

    buttonAll.addEventListener('click', () => {
      buttonAll.classList.add(styles.isChecked);
      buttonTech.classList.remove(`${styles.isChecked}`);
      buttonPersonal.classList.remove(`${styles.isChecked}`);
      articleTiles.forEach((articleTile) => {
        articleTile.classList.remove(styles.shown);
        articleTile.classList.remove(styles.animate);
        articleTile.removeAttribute('style');
      });
      articleTilesGrid.removeAttribute('style');
      articlesAll.forEach((article) => article.classList.remove(styles.hidden));
      // eslint-disable-next-line no-new
      new AnimOnScroll(document.querySelector(tileGrid), tileGrid, {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.1,
      });
    });
    buttonTech.addEventListener('click', () => {
      buttonAll.classList.remove(`${styles.isChecked}`);
      buttonTech.classList.add(`${styles.isChecked}`);
      buttonPersonal.classList.remove(`${styles.isChecked}`);
      articleTiles.forEach((articleTile) => {
        articleTile.classList.remove(styles.shown);
        articleTile.classList.remove(styles.animate);
        articleTile.removeAttribute('style');
      });
      articleTilesGrid.removeAttribute('style');
      articlesTech.forEach((article) => article.classList.remove(styles.hidden));
      articlesPersonal.forEach((article) => article.classList.add(styles.hidden));
      // eslint-disable-next-line no-new
      new AnimOnScroll(document.querySelector(tileGrid), tileGrid, {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.1,
      });
    });
    buttonPersonal.addEventListener('click', () => {
      buttonAll.classList.remove(`${styles.isChecked}`);
      buttonTech.classList.remove(`${styles.isChecked}`);
      buttonPersonal.classList.add(`${styles.isChecked}`);
      articleTiles.forEach((articleTile) => {
        articleTile.classList.remove(styles.shown);
        articleTile.classList.remove(styles.animate);
        articleTile.removeAttribute('style');
      });
      articleTilesGrid.removeAttribute('style');
      articlesTech.forEach((article) => article.classList.add(styles.hidden));
      articlesPersonal.forEach((article) => article.classList.remove(styles.hidden));
      // eslint-disable-next-line no-new
      new AnimOnScroll(document.querySelector(tileGrid), tileGrid, {
        minDuration: 0.4,
        maxDuration: 0.7,
        viewportFactor: 0.1,
      });
    });

    // eslint-disable-next-line no-new
    new AnimOnScroll(document.querySelector(tileGrid), tileGrid, {
      minDuration: 0.4,
      maxDuration: 0.7,
      viewportFactor: 0.1,
    });
  }, []);

  return (
    <Layout>
      <SEO title="Articles" />
      <div className={styles.articleHeader}>
        <div className={styles.articleHeader_pageTitle}>
          <h2>Articles</h2>
        </div>
        <div className={styles.filtersButtonGroup}>
          { /* eslint-disable-next-line react/button-has-type */ }
          <button
            className={`${styles.filtersButton} ${styles.isChecked} button-all`}
          >
            All
          </button>
          { /* eslint-disable-next-line react/button-has-type */ }
          <button
            className={`${styles.filtersButton} button-tech`}
          >
            Tech
          </button>
          { /* eslint-disable-next-line react/button-has-type */ }
          <button
            className={`${styles.filtersButton} button-personal`}
          >
            Personal
          </button>
        </div>
      </div>

      <div className={`${styles.articlesTilesGrid} ${styles.effect6}`}>
        {
          posts.nodes.map((node) => (
            <article
              key={node.id}
              className={`${styles.articleTile} ${styles.col} ${node.frontmatter.categories[1]}`}
            >
              <a
                href={`${site.siteMetadata.siteUrl}/articles/${node.frontmatter.categories[1]}/${node.fields.slug.slice(12)}`}
                title={node.frontmatter.title}
                className={styles.articleLink}
              >
                <p className={styles.articleTile_postTeaser}>
                  <img
                    src={`${site.siteMetadata.siteUrl}/images/${node.frontmatter.teaser}`}
                    alt="teaser"
                  />
                </p>
                <p className={styles.articleTile_entryDate}>
                  <time dateTime={moment(node.frontmatter.date).format()}>
                    {node.frontmatter.datePublished}
                  </time>
                </p>
                <h2 className={styles.articleTile_postTitle}>{node.frontmatter.title}</h2>
                <p className={styles.articleTile_postExcerpt}>
                  {node.frontmatter.excerpt}
                </p>
              </a>
            </article>
          ))
        }
      </div>

    </Layout>
  );
};

export default ArticlesPage;
