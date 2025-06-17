import path from 'node:path'
import { fileURLToPath } from 'node:url'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json' with { type: 'json' }

const isProd = process.env.NODE_ENV === 'production'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const basePlugins = [
  typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    exclude: ['**/__tests__/**']
  }),
  resolve(),
  commonjs()
]

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: !isProd
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: !isProd
      },
      {
        file: pkg.unpkg,
        format: 'umd',
        exports: 'named',
        name: 'IsAwaitable',
        sourcemap: !isProd
      }
    ],
    plugins: [
      ...basePlugins,
      isProd && terser()
    ].filter(Boolean)
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()]
  }
]
