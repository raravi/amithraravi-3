/* global document */
import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import imagesLoaded from 'imagesloaded';
import anime from 'animejs';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styles from '../styles/portfolio.module.css';

const PortfolioPage = () => {
  const { site, portfolio } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        portfolio: allMarkdownRemark(
          sort: {
            fields: [frontmatter___date]
            order: DESC
          }
          filter: {
            fields: {
              sourceName: {eq: "portfolio"}
            }
          }
        ) {
          nodes {
            id
            frontmatter {
              title
              teaser
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
    const portfolioLinks = document.getElementsByClassName(styles.portfolioLink);
    if (document.getElementsByClassName(styles.portfolioTile).length > 0) {
      imagesLoaded(portfolioLinks, () => {
        [].slice.call(portfolioLinks).forEach((item) => {
          // Create SVG.
          const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
          );
          const path = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path',
          );
          const itemW = item.offsetWidth;
          const itemH = item.offsetHeight;

          svg.setAttribute('width', `${itemW}px`);
          svg.setAttribute('height', `${itemH}px`);
          svg.setAttribute('viewBox', `0 0 ${itemW} ${itemH}`);
          svg.setAttribute('class', 'grid__deco');
          path.setAttribute(
            'd',
            `M0,0 l${itemW},0 0,${itemH} -${itemW},0 0,-${itemH}`,
          );
          path.setAttribute('stroke-dashoffset', anime.setDashoffset(path));
          svg.appendChild(path);
          item.parentNode.appendChild(svg);
        });

        const animeLineDrawingOpts = {
          duration: 800,
          delay(t, i) {
            return i * 150 + 50;
          },
          easing: 'easeInOutSine',
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [
            { value: [0, 1] },
            {
              value: [1, 0], duration: 200, easing: 'linear', delay: 500,
            },
          ],
        };
        animeLineDrawingOpts.targets = document.querySelectorAll(
          '.grid__deco > path',
        );

        anime.remove(animeLineDrawingOpts.targets);
        anime(animeLineDrawingOpts);

        const animeOpts = {
          duration: 800,
          easing: 'easeInOutCubic',
          delay(t, i) {
            return i * 150 + 1200;
          },
          opacity: {
            value: [0, 1],
            easing: 'linear',
          },
          scale: [0.25, 1],
        };
        animeOpts.targets = document.querySelectorAll(`.${styles.portfolioLink}`);

        anime.remove(animeOpts.targets);
        anime(animeOpts);
      });
    }
  }, []);

  return (
    <Layout>
      <SEO title="Portfolio" />
      <div className={styles.portfolioHeader}>
        <div className={styles.portfolioHeader_pageTitle}>
          <h2>Portfolio</h2>
        </div>
      </div>
      <div className={styles.portfolioTilesGrid}>
        {
          portfolio.nodes.map((node) => (
            <article key={node.id} className={`${styles.portfolioTile} ${styles.col}`}>
              <a
                href={`${site.siteMetadata.siteUrl}/portfolio/${node.fields.slug.slice(12)}`}
                title={node.frontmatter.title}
                className={styles.portfolioLink}
              >
                <p className={styles.postTeaser}>
                  <img
                    src={`${site.siteMetadata.siteUrl}/images/${node.frontmatter.teaser}`}
                    alt="teaser"
                  />
                </p>
                <h2 className={styles.postTitle}>{node.frontmatter.title}</h2>
              </a>
            </article>
          ))
        }
      </div>
    </Layout>
  );
};

export default PortfolioPage;
