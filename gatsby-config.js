module.exports = {
  siteMetadata: {
    title: `Nico Vandenhove`,
    description: `Nico's portfolio website.`,
    author: `Nico Vandenhove`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    { resolve: `gatsby-transformer-json`, options: { typeName: `Json` } },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `${__dirname}/src/svgs`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nico's Portfolio`,
        short_name: `Nico`,
        start_url: `/`,
        background_color: `#011a21`,
        theme_color: `#011a21`,
        display: `fullscreen`,
        icon: `src/images/icon.png`,
        icons: [
          {
            src: `favicon/icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `favicon/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ],
};
