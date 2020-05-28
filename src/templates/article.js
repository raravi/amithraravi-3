/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import moment from 'moment';
import ArticleLayout from '../components/articleLayout';
import styles from '../styles/article.module.css';

export default function ArticleTemplate({ path, data }) {
  const post = data.markdownRemark;
  const authors = data.allAuthorsYaml;
  const { siteUrl } = data.site.siteMetadata;
  const { posts } = data;
  const postCategory = post.frontmatter.categories[1];

  return (
    <ArticleLayout layout="article" category={post.frontmatter.categories[1]}>
      <article className="main-wrap">
        <div className="line-red" />
        <div className={styles.article_pageTitle}>
          <h1>{post.frontmatter.title}</h1>
        </div>
        <div className={styles.article_pageDate}>
          <p>
            <time dateTime={moment(post.frontmatter.date).format()}>
              {post.frontmatter.datePublished}
            </time>
          </p>
        </div>
        <div className="line-red" />
        <div className={styles.article_post} dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="line-red" />
        <footer className={styles.article_pageFooter}>
          <div className={styles.article_authorImage}>
            <img
              src={`/images/${authors.edges[0].node.avatar}`}
              alt={authors.edges[0].node.name}
            />
          </div>
          <div className={styles.article_authorContent}>
            <h3 className={styles.authorName}>
              Written by
              {' '}
              <a href={authors.edges[0].node.web}>{authors.edges[0].node.name}</a>
            </h3>
            <p className={styles.authorBio}>{authors.edges[0].node.bio}</p>
            <div className={styles.article_shareThis}>
              <div className={`${styles.col} ${styles.first}`}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${post.frontmatter.title.replace(/ /gi, '%20')}&url=${siteUrl}${path}&via=${authors.edges[0].node.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  &nbsp;Twitter
                </a>
              </div>
              <div className={`${styles.col} ${styles.middle}`}>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </div>
              <div className={`${styles.col} ${styles.last}`}>
                <a
                  href={`https://plus.google.com/share?url=${siteUrl}${path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  &nbsp;Google+
                </a>
              </div>
            </div>
          </div>
        </footer>
        <div className="line-red" />
        <div className={styles.article_archiveWrap}>
          <h4>You Might Also Like</h4>
          <ul className={styles.thGrid}>
            {
              posts.edges.map(({ node }) => (
                <li>
                  <a
                    href={`${siteUrl}/articles/${postCategory}/${node.fields.slug.slice(12)}`}
                    title={node.frontmatter.title}
                  >
                    <div>
                      <img
                        src={`${siteUrl}/images/${node.frontmatter.teaser}`}
                        alt="teaser"
                      />
                      <h6>{node.frontmatter.title}</h6>
                    </div>
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="div-30-high" />
        <aside>
          {/* {% include post-comments.html -%} */}
        </aside>
      </article>
    </ArticleLayout>
  );
}

ArticleTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export const query = graphql`
  query(
    $slug: String!
    $category: String!
  ) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        categories,
        date
        datePublished: date(formatString: "Do MMMM YYYY")
      }
      fields {
        slug
      }
    }
    allAuthorsYaml {
      edges {
        node {
          id
          email
          bio
          avatar
          name
          twitter
          web
          google {
            plus
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    posts: allMarkdownRemark(
      limit: 4,
      filter: {
        frontmatter: {
          categories: {eq: $category}
        }
        fields: {
          slug: {ne: $slug}
        }
      }
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) {
      edges {
        node {
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
  }
`;
