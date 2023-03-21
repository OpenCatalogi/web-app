exports.onCreateBabelConfig = ({ actions }) => {
	actions.setBabelPlugin({
		name: "@babel/plugin-transform-react-jsx",
		options: {
			runtime: "automatic",
		},
	});
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
	if (stage === "develop") {
		const config = getConfig();
		const miniCssExtractPlugin = config.plugins.find(
			(plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
		);
		if (miniCssExtractPlugin) {
			miniCssExtractPlugin.options.ignoreOrder = true;
		}
		actions.replaceWebpackConfig(config);
	}
};
