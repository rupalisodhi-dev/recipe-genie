module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
    settings: { react: { version: "detect" } },
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: { "react/react-in-jsx-scope": "off" },
    ignorePatterns: ["dist", "node_modules"]
  };
  