/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import ArticleLayout from '../components/articleLayout';

export default function ArticleTemplate({ data }) {
  const post = data.markdownRemark;

  return (
    <ArticleLayout layout="article" category={post.frontmatter.categories[1]}>
      <article className="main-wrap">
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </ArticleLayout>
  );
}

ArticleTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        categories
      }
    }
  }
`;
