/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({
  path: `static/.env.${process.env.NODE_ENV}`,
});

module.exports = {
  pathPrefix:
    process.env.GATSBY_USE_GITHUB_REPOSITORY_NAME_AS_PATH_PREFIX === "true"
      ? `/${process.env.GATSBY_GITHUB_REPOSITORY_NAME}`
      : "", // we do NOT want to set the prefix if we're using an DNS
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
          {
            pathname: "/github/[md]",
            crumbLabel: "Markdown file",
          },
        ],
      },
    },
  ],
};
