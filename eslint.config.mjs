import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	js.configs.recommended,
	...tseslint.configs.recommended,
	unicorn.configs["flat/recommended"],
	prettier,
	{
		files: ["**/*.tsx"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		settings: {
			react: { version: "detect" },
		},
		plugins: {
			"react-hooks": reactHooks,
			react,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...react.configs.recommended.rules,
		},
	},
	{
		rules: {
			"react/react-in-jsx-scope": "off",
			"unicorn/prevent-abbreviations": "off",
			"unicorn/numeric-separators-style": [
				"error",
				{
					number: { minimumDigits: 0 },
				},
			],
		},
	},
];
