import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const dev = mode === 'development'

    return {
        base: dev ? '/' : '/vue-project/',
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            target: 'esnext'
        }
    }
})
