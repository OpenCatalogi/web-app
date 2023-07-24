/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({
  path: `static/.env.${process.env.NODE_ENV}`,
});

module.exports = {
  pathPrefix: `/${process.env.GITHUB_REPOSITORY_NAME}`,
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layout/Layout.tsx`),
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`,
        ],
        excludeOptions: {
          separator: ".",
        },
        autoGenHomeLabel: "OpenCatalogi",
        crumbLabelUpdates: [
          {
            pathname: "/components",
            crumbLabel: "Components overview",
          },
          {
            pathname: "/components/[componentId]",
            crumbLabel: "Component",
          },
          {
            pathname: "/organizations/[organizationId]",
            crumbLabel: "Organization",
          },
          {
            pathname: "/categories/[categoryId]",
            crumbLabel: "Category",
          },
          {
            pathname: "/documentation/about",
            crumbLabel: "Over OpenCatalogi",
          },
          {
            pathname: "/applications/[applicationId]",
            crumbLabel: "Application",
          },
        ],
      },
    },
  ],
};
