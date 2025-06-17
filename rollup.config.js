import fs from 'fs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)))

const isProd = process.env.NODE_ENV === 'production'

const basePlugins = [
  nodeResolve(),
  typescript({ tsconfig: './tsconfig.json', exclude: ['**/__tests__/**'] })
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
        file: pkg.browser,
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
