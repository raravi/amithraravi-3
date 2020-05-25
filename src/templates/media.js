/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import MediaLayout from '../components/mediaLayout';

export default function MediaTemplate({ data }) {
  const post = data.markdownRemark;

  return (
    <MediaLayout>
      <main className="main-wrap">
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        title
      }
    }
  }
`;
