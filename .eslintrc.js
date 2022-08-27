module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      rules: {
        "no-console": ["error", { allow: ["warn", "error"] }],
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
        semi: ["error", "never"],
        indent: [
          "error",
          2,
          {
            SwitchCase: 1,
          },
        ],
        "space-before-function-paren": 0,
        quotes: ["error", "double"],
        "jsx-quotes": ["error", "prefer-double"],
        "multiline-ternary": 0,
        "no-nested-ternary": 0,
        "new-cap": 0,
        "no-unused-expressions": 0,
        "no-new": 0,
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/no-autofocus": [
          2,
          {
            ignoreNonDOM: true,
          },
        ],
        "no-debugger": 0,
        "object-curly-spacing": ["error", "always"],
      },
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
}
