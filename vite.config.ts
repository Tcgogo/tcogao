import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import Unocss from 'unocss/vite';
import Components, { kebabCase } from '@uni-helper/vite-plugin-uni-components';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      dts: true,
      directives: true,
      resolvers: [
        {
          type: 'component',
          resolve: (name: string) => {
            if (name.match(/^Wd[A-Z]/)) {
              const compName = kebabCase(name);
              return {
                name,
                from: `wot-design-uni/components/${compName}/${compName}.vue`,
              };
            }
          },
        },
        {
          type: 'component',
          resolve: (name: string) => {
            if (name.match(/^Tn[A-Z]/)) {
              const compName = kebabCase(name).split('-').splice(1).join('-');
              return {
                name,
                from: `@tuniao/tnui-vue3-uniapp/components/${compName}/src/${compName}.vue`,
              };
            }
          },
        },
      ],
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        // 插件预设支持导入的api
        'vue',
        'uni-app',
      ],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      dts: './auto-imports.d.ts',
    }),
    uni(),
    Unocss(),
  ],
  server: {
    // port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'https://service-rbji0bev-1256505457.cd.apigw.tencentcs.com/release',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
      '/api-prod/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api-prod/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  css: {
    // 配置`scss`和`less`全局变量
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/vars/_base.scss";',
      },
    },
  },
});
