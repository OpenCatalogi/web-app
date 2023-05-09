/* eslint-env node */
module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    "preset-default",
    "removeDimensions",
    "removeTitle",
    "convertStyleToAttrs",

    {
      name: "sortAttrs",
      params: {
        xmlnsOrder: "alphabetical",
      },
    },
  ],
};
