/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import MediaLayout from '../components/mediaLayout';
import styles from '../styles/media.module.css';

export default function MediaTemplate({ data }) {
  const post = data.markdownRemark;
  const { siteUrl } = data.site.siteMetadata;

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (window) {
      // eslint-disable-next-line no-undef
      window.scroll({
        top: 0,
        left: 0,
      });
    }
  }, []);

  return (
    <MediaLayout layout="media">
      <main className="main-wrap">
        {post.frontmatter.image
        && (
        <div className={styles.media_pageImage}>
          <img
            src={`${siteUrl}/images/${post.frontmatter.image}`}
            alt={post.frontmatter.title}
          />
        </div>
        )}
        <div className="line-red" />
        <div className={styles.media_pageTitle}>
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
