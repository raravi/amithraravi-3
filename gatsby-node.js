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
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let pageSlug;
    if (node.fields.sourceName === 'posts') {
      const slug = node.fields.slug.slice(12);
      pageSlug = `/articles/${node.frontmatter.categories[1]}/${slug}`;
      createPage({
        path: pageSlug,
        component: path.resolve('./src/templates/article.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    } else if (node.fields.sourceName === 'portfolio') {
      const slug = node.fields.slug.slice(12);
      pageSlug = `/portfolio/${slug}`;
      createPage({
        path: pageSlug,
        component: path.resolve('./src/templates/media.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    } else {
      pageSlug = node.fields.slug;
      createPage({
        path: pageSlug,
        component: path.resolve('./src/templates/media.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    }
  });
};
