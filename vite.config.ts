import { fileURLToPath, URL } from 'node:url';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 1915,
    },
    plugins: [
        vue(),
        Unocss(),
        AutoImport({
            imports: ['vue'],
            resolvers: [],
            include: ['src/**/*.vue'],
            dts: 'src/auto-import.d.ts',
        }),
        Components({
            dirs: ['src/components'],
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false
                }),
            ],
            dts: 'src/components.d.ts',
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
