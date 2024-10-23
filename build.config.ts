import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**/*.ts', '**/*.css', '**/*.js'],
      format: 'esm',
      loaders: ['js'],
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**/*.ts', '**/*.css'],
      format: 'cjs',
      loaders: ['js'],
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**/*.vue'],
      loaders: ['vue'],
    },
    {
      builder: 'mkdist',
      input: './public',
      outDir: './dist',
      pattern: ['**/*'],
    },
  ],
  declaration: true,
  clean: true,
  sourcemap: true,
  rollup: { emitCJS: true },
})
