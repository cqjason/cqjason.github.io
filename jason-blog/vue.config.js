module.exports = {
  transpileDependencies: true,
  outputDir: "../docs",
  publicPath: "./",
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|pdf)$/,
          use: [
            { loader: "file-loader", options: { name: "[path][name].[ext]" } },
          ],
        },

        // 配置读取 *.md 文件的规则
        {
          test: /\.md$/,
          use: [{ loader: "markdown-loader", options: {} }],
        },
      ],
    },
  },
};
