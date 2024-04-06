import js from "@eslint/js";
import prettier from "eslint-config-prettier";
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
		rules: {
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
