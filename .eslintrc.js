module.exports = {
	root: true,

	env: {
		node: true,
	},

	parserOptions: {
		parser: 'babel-eslint',
	},

	// 코드 정리 플러그인 추가
	plugins: ['prettier'],

	rules: {
		'prettier/prettier': [
			'error',
			// 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
			// https://prettier.io/docs/en/options.html
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				htmlWhitespaceSensitivity: 'ignore',
			},
		],
		// 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
	},

	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],

	extends: [
		'plugin:vue/strongly-recommended',
		'eslint:recommended',
		'@vue/prettier',
	],
};
