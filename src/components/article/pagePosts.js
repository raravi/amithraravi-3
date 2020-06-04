import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/pagePosts.module.css';

const PagePosts = ({ posts, siteUrl, postCategory }) => (
  <div className={styles.article_archiveWrap}>
    <h4>You Might Also Like</h4>
    <ul className={styles.thGrid}>
      {
        posts.edges.map(({ node }) => (
          <li key={`${node.fields.slug}`}>
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
);

PagePosts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.object.isRequired,
  siteUrl: PropTypes.string.isRequired,
  postCategory: PropTypes.string.isRequired,
};

export default PagePosts;
