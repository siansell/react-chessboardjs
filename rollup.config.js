import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: ['**/node_modules/**'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-dnd/lib/index.js': [
          'DragDropContext',
          'DragLayer',
          'DragSource',
          'DropTarget',
        ],
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    resolve(),
    uglify(),
  ],
  external: [
    'react',
    /*
    asap causes a build warning, and also prevents rollup --watch running.
    Not sure which package is pulling it in as a dependency, but we don't seem to need it.
    So let's just exclude it.
    Ref: https://github.com/kriskowal/asap/issues/64 */
    'asap',
  ],
}
