const baseConfig = require("../../.eslintrc.json");

baseConfig.extends = [...baseConfig.extends, "plugin:jsx-a11y/recommended"];

baseConfig.plugins = [...baseConfig.plugins, "jsx-a11y", "testing-library"];

module.exports = baseConfig;
