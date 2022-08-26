import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import {nodeResolve}    from '@rollup/plugin-node-resolve';
import autoprefixer     from 'autoprefixer';
import cssnano          from 'cssnano';




// https://vitejs.dev/config/
export default defineConfig({
	base: '',
	plugins: [
		nodeResolve({
			moduleDirectories: ['src/'],
			extensions:        ['.js', '.ts', '.jsx', '.tsx'],
		}),
		react(),
	],
	css: {
		modules: {
			scopeBehaviour: 'global',
		},
		postcss: {
			plugins: [
				autoprefixer(),
				cssnano(),
			],
		},
	},
});
