/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import MediaLayout from '../components/mediaLayout';
import styles from '../styles/media.module.css';

export default function MediaTemplate({ data }) {
  const post = data.markdownRemark;

  return (
    <MediaLayout layout="media">
      <main className="main-wrap">
        {post.frontmatter.image
        && (
        <div className={styles.pageImage}>
          <img
            src={`/images/${post.frontmatter.image}`}
            alt={post.frontmatter.title}
          />
        </div>
        )}
        <div className="line-red" />
        <div className={styles.pageTitle}>
          <h1>{ post.frontmatter.title }</h1>
        </div>
        <div className="line-red" />
        <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
    </MediaLayout>
  );
}

MediaTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        image
      }
    }
  }
`;
