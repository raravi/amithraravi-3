const postcssPresetEnv = require('postcss-preset-env');
const site = require('./config/site');

module.exports = {
  siteMetadata: {
    siteUrl: `${site.url}`,
    title: `${site.title}`,
    description: `${site.description}`,
    author: `${site.author}`,
    email: `${site.email}`,
    imagekitUrl: `${site.imagekitUrl}`,
    twitter: {
      url: `${site.twitter.url}`,
      username: `${site.twitter.username}`,
    },
    facebook: {
      url: `${site.facebook.url}`,
      username: `${site.facebook.username}`,
    },
    linkedin: {
      url: `${site.linkedin.url}`,
      username: `${site.linkedin.username}`,
    },
    googleplus: {
      url: `${site.googleplus.url}`,
      username: `${site.googleplus.username}`,
    },
    github: {
      url: `${site.github.url}`,
      username: `${site.github.username}`,
    },
    instagram: {
      url: `${site.instagram.url}`,
      username: `${site.instagram.username}`,
    },
    xda: {
      url: `${site.xda.url}`,
      username: `${site.xda.username}`,
    },
    goodreads: {
      url: `${site.goodreads.url}`,
      username: `${site.goodreads.username}`,
    },
    runkeeper: {
      url: `${site.runkeeper.url}`,
      username: `${site.runkeeper.username}`,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postcssOptions: {
          plugins: [
            postcssPresetEnv({
              importFrom: 'src/styles/app.css',
              stage: 1,
              features: {
                'custom-properties': true,
                'custom-media-queries': true,
              },
            }),
          ],
        },
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'portfolio',
        path: `${__dirname}/src/portfolio/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'comments',
        path: `${__dirname}/src/comments/`,
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'amithraravi.com',
        short_name: 'rArAvi',
        start_url: '/',
        background_color: '#F9D64C',
        theme_color: '#F9D64C',
        display: 'minimal-ui',
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    // this plugin enables Progressive Web App + Offline functionality
    'gatsby-plugin-offline',
  ],
};
