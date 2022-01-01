module.exports = {
  extends: [
    "react-app",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    "import/no-anonymous-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
