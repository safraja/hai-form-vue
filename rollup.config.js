import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import multiInput from 'rollup-plugin-multi-input';
import scss from 'rollup-plugin-scss';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVariables from 'rollup-plugin-dynamic-import-variables';

export default [
	{
		input: ['src/classes/**/*.js'],
		preserveEntrySignatures: 'allow-extension',
		output: [
			{ dir: 'dist/with-dependencies', format: 'es', entryFileNames: '[name].esm.min.js',
				banner: `/**
 * Hai Form (https://github.com/safraja/hai-form) - Javascript library for custom inputs and selects with additional functions.
 * Copyright (c) 2021 Jakub Šafránek All Rights Reserved
 * @license MIT Licensed
 */`,}
		],
		plugins: [
			multiInput({
				relative: 'src/classes',
				transformOutputPath: (output, input) => `${path.basename(output)}`,
			}),
			nodeResolve({
			}),
			babel({
				exclude: 'node_modules/**',
				plugins: ['transform-class-properties'],
				presets: ['@babel/preset-env'],
			}),
			terser({
				format: {
					comments: function (node, comment) {
						var text = comment.value;
						var type = comment.type;
						if (type == "comment2")
						{	// multiline comment
							if(text.includes('Copyright'))
							{
								return true;
							}

							return /@preserve|@license|@cc_on/i.test(text);
						}
					},
				},
			}),
			commonjs(),
			dynamicImportVariables({
				warnOnError: true
			})
		]
	},
	{
		input: ['src/classes/**/*.js'],
		external: ['fuse.js'],
		preserveEntrySignatures: 'allow-extension',
		output: [
			{ dir: 'dist/basic', format: 'es', entryFileNames: '[name].esm.min.js',
				banner: `/**
 * Hai Form (https://github.com/safraja/hai-form) - Javascript library for custom inputs and selects with additional functions.
 * Copyright (c) 2021 Jakub Šafránek All Rights Reserved
 * @license MIT Licensed
 */`,}
		],
		plugins: [
			multiInput({
				relative: 'src/classes',
				transformOutputPath: (output, input) => `${path.basename(output)}`,
			}),
			babel({
				exclude: 'node_modules/**',
				plugins: ['transform-class-properties'],
				presets: ['@babel/preset-env'],
			}),
			terser({
				format: {
					comments: function (node, comment) {
						var text = comment.value;
						var type = comment.type;
						if (type == "comment2")
						{	// multiline comment
							if(text.includes('Copyright'))
							{
								return true;
							}

							return /@preserve|@license|@cc_on/i.test(text);
						}
					},
				},
			}),
			commonjs(),
			dynamicImportVariables({
				warnOnError: true
			})
		],
	},
	/*{
		input: 'src/css.js',
		output: {
			banner: ``,
			file: 'output.js',
			format: 'esm'
		},
		plugins: [
			scss({
				outputStyle: 'compressed'
			})
		]
	}*/
];
