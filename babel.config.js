module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@elements": "./src/elements",
            "@assets": "./src/assets",
            "@api": "./src/api",
            "@config": "./src/config",
            "@navigation": "./src/navigation",
            "@store": "./src/store",
            "@fonts": "./src/fonts",
            "@hooks": "./src/hooks",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
