import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import typescript from '@rollup/plugin-typescript';

const svelteConfig = require('./svelte.config.js')

const production = !process.env.ROLLUP_WATCH;

const cordovaFolder = 'src-cordova';
let publicFolder = 'public';
if (process.env.CORDOVA_PLATFORM) {
	publicFolder = `${cordovaFolder}/www`
}

console.log(`publicFolder is ${publicFolder}`)

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `${publicFolder}/bundle.js`
	},
	plugins: [
		svelte({
			...svelteConfig,
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		typescript({ sourceMap: !production }),

		css({ output: `bundle.css` }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({ browser: true }),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload(publicFolder),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
