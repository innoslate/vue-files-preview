import path from 'node:path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import {copyPackageJsonPlugin} from './vite-plugins/copy.plugin'

const pathSrc = path.resolve(__dirname, 'src')
const pathPackages = path.resolve(__dirname, 'packages')

// Vite Configuration
export default defineConfig({
    resolve: {
        alias: {
            '@src': pathSrc,
            '@packages': pathPackages,
        },
    },
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
            include: ['./packages/**/*.ts', './packages/**/*.tsx', './packages/**/*.vue'], // Add this line
            tsconfigPath: './tsconfig.json', // Clearly specified tsconfig file path
        }),
        copyPackageJsonPlugin(),
        AutoImport({
            imports: [
                'vue',
                {
                    '@vueuse/core': [
                        'onKeyStroke',
                    ],
                },
            ],
            dts: path.resolve(pathPackages, 'auto-imports.d.ts'),
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            name: 'vue-files-preview',
            entry: './packages/index.ts',
        },
        commonjsOptions: {
            esmExternals: true,
        },
        rollupOptions: {
            external: ['vue'],
            output: [
                {
                    globals: {
                        vue: 'Vue',
                    },
                    // Packaging format
                    format: 'es',
                    // Packaged file name
                    entryFileNames: '[name].mjs',
                    // Let the package directory correspond to our directory
                    preserveModules: true,
                    exports: 'auto',
                    // Configure the packaging root directory
                    dir: './dist/es',
                },
                {
                    globals: {
                        vue: 'Vue',
                    },
                    // Packaging format
                    format: 'cjs',
                    // Packaged file name
                    entryFileNames: '[name].js',
                    // Let the package directory correspond to our directory
                    preserveModules: true,
                    exports: 'auto',
                    // Configure the packaging root directory
                    dir: './dist/lib',
                },
            ],
        },
        minify: true,
    },
})
