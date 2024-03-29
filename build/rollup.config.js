import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'
import flow from 'rollup-plugin-flow-no-whitespace'
import json from '@rollup/plugin-json'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'
import pkg from '../package.json'

const production = !process.env.ROLLUP_WATCH
const version = process.env.VERSION || pkg.version
const libName = 'MouseShake'
const birthYear = 2022
const banner =
    '/*\n' +
    ` * ${pkg.name} v${version}\n` +
    ` * (c) ${birthYear}-${new Date().getFullYear()} ${pkg.author}\n` +
    ` * Released under the ${pkg.license} License.\n` +
    ' */'
const outPath = './dist/'
const outFileInfo = {
  'dev': {
    'cjs': pkg.main,
    'esm': pkg.module,
    'umd': pkg.browser
  },
  'prod': {
    'cjs': outPath + pkg.name + '.cjs.min.js',
    'esm': outPath + pkg.name + '.esm.min.js',
    'umd': outPath + pkg.name + '.min.js'
  }
}

export default {
  input: 'src/index.js',
  output: [
    {
      file: production ? outFileInfo.prod.cjs : outFileInfo.dev.cjs,
      format: 'cjs',
      banner: banner,
      name: libName,
      exports: 'auto'
    },
    {
      file: production ? outFileInfo.prod.esm : outFileInfo.dev.esm,
      format: 'esm',
      banner: banner,
      name: libName,
      exports: 'auto'
    },
    {
      file: production ? outFileInfo.prod.umd : outFileInfo.dev.umd,
      format: 'umd',
      banner: banner,
      name: libName,
      exports: 'auto'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    buble({
      include: 'src/**'
    }),
    production && terser(),
    flow(),
    json(),
    (production ? '' : serve({
      open: true,
      openPage: '/example/index.html',
      contentBase: '',
      host: '0.0.0.0',
      port: 1180
    })),
    copy({
      targets: [
        { src: `dist/*`, dest: `example/js` }
      ],
      hook: 'writeBundle',
      verbose: true
    })
  ]
}
