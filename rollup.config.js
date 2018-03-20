import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

const plugins = [
  babel({
    exclude: ['**/node_modules/**'],
  }),
  commonjs({
    include: 'node_modules/**',
    exclude: [
      'node_modules/uuid/lib/rng.js', // causing a build error, and we don't seem to need it
      'node_modules/asap/raw.js', // causing a build error, and we don't seem to need it https://github.com/kriskowal/asap/issues/64
    ],
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
  resolve({
    browser: true,
  }),
]

if (env === 'production') {
  plugins.push(uglify())
}

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  plugins,
  external: [
    'react',
    'react-dom',
  ],
}
