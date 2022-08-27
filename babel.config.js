module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          "^@/(.+)": "./app/\\1",
        },
        extensions: [
          ".ios.js",
          ".android.js",
          ".js",
          ".jsx",
          ".json",
          ".tsx",
          ".ts",
          ".native.js",
        ],
      },
    ],
    "react-native-reanimated/plugin",
  ],
}
