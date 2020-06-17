/* global document */
import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import imagesLoaded from 'imagesloaded';
import anime from 'animejs';
import moment from 'moment';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styles from '../styles/articles.module.css';

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
    const buttonAll = document.querySelector('.button-all');
    const buttonTech = document.querySelector('.button-tech');
    const buttonPersonal = document.querySelector('.button-personal');
    const articlesAll = document.querySelectorAll(`.${styles.col}`);
    const articlesTech = document.querySelectorAll('.tech');
    const articlesPersonal = document.querySelectorAll('.personal');

    buttonAll.addEventListener('click', () => {
      buttonAll.classList.add(styles.isChecked);
      buttonTech.classList.remove(`${styles.isChecked}`);
      buttonPersonal.classList.remove(`${styles.isChecked}`);
      articlesAll.forEach((article) => article.classList.remove(styles.hidden));
    });
    buttonTech.addEventListener('click', () => {
      buttonAll.classList.remove(`${styles.isChecked}`);
      buttonTech.classList.add(`${styles.isChecked}`);
      buttonPersonal.classList.remove(`${styles.isChecked}`);
      articlesTech.forEach((article) => article.classList.remove(styles.hidden));
      articlesPersonal.forEach((article) => article.classList.add(styles.hidden));
    });
    buttonPersonal.addEventListener('click', () => {
      buttonAll.classList.remove(`${styles.isChecked}`);
      buttonTech.classList.remove(`${styles.isChecked}`);
      buttonPersonal.classList.add(`${styles.isChecked}`);
      articlesTech.forEach((article) => article.classList.add(styles.hidden));
      articlesPersonal.forEach((article) => article.classList.remove(styles.hidden));
    });

    /**
     * Animation from (https://tympanus.net/Development/GridLoadingAnimations/)
     * Uses anime.js
     */
    const articleLinks = document.getElementsByClassName(styles.articleTile);
    imagesLoaded(articleLinks, () => {
      const animeOpts = {
        targets: articleLinks,
        duration: (t, i) => 1000 + i * 50,
        easing: 'easeOutExpo',
        delay: (t, i) => 50 + i * 20,
        opacity: {
          value: [0, 1],
          duration: (t, i) => 250 + i * 50,
          easing: 'linear',
        },
        translateY: [250, 0],
      };

      animeOpts.targets = [].slice.call(articleLinks).sort((a, b) => {
        const aBounds = a.getBoundingClientRect();
        const bBounds = b.getBoundingClientRect();

        return aBounds.left - bBounds.left || aBounds.top - bBounds.top;
      });

      anime.remove(animeOpts.targets);
      anime(animeOpts);
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

      <div className={styles.articlesTilesGrid}>
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
