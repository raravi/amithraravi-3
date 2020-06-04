/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'src/styles/' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories
            }
            fields {
              slug,
              sourceName
            }
          }
        }
      }
    }
  `);
  const comments = await graphql(`
    query {
      comments: allMarkdownRemark(
        sort: {
          fields: [frontmatter___replying_to, frontmatter___date_created]
        }, 
        filter: {
          fields: {
            sourceName: {eq: "comments"}
          }
        }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            _id
            date_created
            email
            emailorig
            name
            replying_to
            url
          }
          html
        }
      }
    }
  `);
  result.data.allMarkdownRemark.edges.forEach(async ({ node }) => {
    let pageSlug;
    if (node.fields.sourceName === 'posts') {
      const slug = node.fields.slug.slice(12);
      pageSlug = `/articles/${node.frontmatter.categories[1]}/${slug}`;
      createPage({
        path: pageSlug,
        component: path.resolve('./src/templates/article.js'),
        context: {
          slug: node.fields.slug,
          category: node.frontmatter.categories[1],
          comments,
        },
      });
    } else if (node.fields.sourceName === 'portfolio') {
      const slug = node.fields.slug.slice(12);
      pageSlug = `/portfolio/${slug}`;
      createPage({
        path: pageSlug,
        component: path.resolve('./src/templates/media.js'),
        context: {
          slug: node.fields.slug,
        },
      });
    } else if (node.fields.sourceName === 'pages') {
      pageSlug = node.fields.slug;
      createPage({
        path: pageSlug,
        component: path.resolve('./src/templates/media.js'),
        context: {
          slug: node.fields.slug,
        },
      });
    }
  });
};
