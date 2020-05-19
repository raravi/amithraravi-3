// eslint-disable-next-line no-undef
module.exports = {
  siteMetadata: {
    title: `Amith Raravi`,
    description: `Reader. Coder. Play a bit of chess, a movie here, a road-trip there :)`,
    author: `@amith_raravi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        // eslint-disable-next-line no-undef
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `amithraravi.com`,
        short_name: `rArAvi`,
        start_url: `/`,
        background_color: `#F9D64C`,
        theme_color: `#F9D64C`,
        display: `minimal-ui`,
        // icon: `src/images/icon-512x512.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/images/icons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-128x128.png`,
            sizes: `128x128`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`
          },
          {
            src: `/images/icons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
