const postcssPresetEnv = require('postcss-preset-env');
const site = require('./config/site');

module.exports = {
  siteMetadata: {
    siteUrl: `${site.siteUrl}`,
    title: 'Amith Raravi',
    description: 'Reader. Coder. Play a bit of chess, a movie here, a road-trip there :)',
    author: '@amith_raravi',
    email: 'amith.raravi@gmail.com',
    twitter: {
      url: 'https://www.twitter.com',
      username: 'amith_raravi',
    },
    facebook: {
      url: 'https://www.facebook.com',
      username: 'amith.raravi',
    },
    linkedin: {
      url: 'https://www.linkedin.com',
      username: 'in/amith-raravi-82b525139',
    },
    googleplus: {
      url: 'https://plus.google.com',
      username: '+AmithRaravi',
    },
    github: {
      url: 'https://github.com',
      username: 'raravi',
    },
    instagram: {
      url: 'https://www.instagram.com',
      username: 'the.raravi.chronicles',
    },
    xda: {
      url: 'https://forum.xda-developers.com',
      username: 'member.php?u=4214466',
    },
    goodreads: {
      url: 'https://www.goodreads.com',
      username: 'user/show/12212283-amith-raravi',
    },
    runkeeper: {
      url: 'https://runkeeper.com',
      username: 'user/raravi',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
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
    'gatsby-remark-source-name',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
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
        // icon: `src/images/icon-512x512.png`, // This path is relative to the root of the site.
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
};
