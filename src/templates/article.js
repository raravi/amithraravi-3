/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import moment from 'moment';
import ArticleLayout from '../components/articleLayout';
import styles from '../styles/article.module.css';

export default function ArticleTemplate({ data }) {
  const post = data.markdownRemark;

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
        categories,
        date
        datePublished: date(formatString: "Do MMMM YYYY")
      }
    }
  }
`;
