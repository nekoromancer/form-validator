import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: {
        file: pkg.main,
        format: 'esm',
    },
    plugins: [
        uglify(),
    ],
}
