/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import ArticleLayout from '../components/articleLayout';
import PageTitle from '../components/article/pageTitle';
import PageFooter from '../components/article/pageFooter';
import PagePosts from '../components/article/pagePosts';
import PageComments from '../components/article/pageComments';
import styles from '../styles/article.module.css';

export default function ArticleTemplate({
  path,
  data,
  pageContext: {
    comments,
  },
}) {
  const post = data.markdownRemark;
  const authors = data.allAuthorsYaml;
  const { siteUrl } = data.site.siteMetadata;
  const { posts } = data;
  const postCategory = post.frontmatter.categories[1];

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (window) {
      // eslint-disable-next-line no-undef
      window.scroll({
        top: 0,
        left: 0,
        // behavior: 'smooth',
      });
    }
  }, []);

  return (
    <ArticleLayout layout="article" category={post.frontmatter.categories[1]}>
      <article className="main-wrap">
        <PageTitle
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          datePublished={post.frontmatter.datePublished}
        />
        <div
          className={styles.article_post}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <PageFooter
          avatar={authors.edges[0].node.avatar}
          name={authors.edges[0].node.name}
          web={authors.edges[0].node.web}
          bio={authors.edges[0].node.bio}
          title={post.frontmatter.title}
          siteUrl={siteUrl}
          path={path}
          twitter={authors.edges[0].node.twitter}
        />
        <PagePosts
          posts={posts}
          siteUrl={siteUrl}
          postCategory={postCategory}
        />
        <aside>
          <PageComments
            comments={comments.data.comments}
            path={path}
            siteUrl={siteUrl}
          />
        </aside>
      </article>
    </ArticleLayout>
  );
}

ArticleTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageContext: PropTypes.object.isRequired,
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
