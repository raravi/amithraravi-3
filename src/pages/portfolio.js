import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
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

  return (
    <Layout>
      <SEO title="Portfolio" />
      <div className={styles.portfolioHeader}>
        <div className={styles.portfolioHeader_pageTitle}>
          <h2>Portfolio</h2>
        </div>
      </div>
      <div className="div-5-high" />
      <div className={styles.portfolioTilesGrid}>
        {
          portfolio.nodes.map((node) => (
            <article className={`${styles.portfolioTile} ${styles.col}`}>
              <a
                href={`${site.siteMetadata.siteUrl}/portfolio/${node.fields.slug.slice(12)}`}
                title={node.frontmatter.title}
                className={styles.portfolioLink}
              >
                <p className={styles.postTeaser}>
                  <img
                    src={`/images/${node.frontmatter.teaser}`}
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
