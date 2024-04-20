import { defineConfig } from 'vitepress';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock';
import AutoImport from 'unplugin-auto-import/vite';
import Unocss from 'unocss/vite';
import unocssCongfig from '../../uno.config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'hooui',
    base: '/hooui',
    description: '这是一个vue3工具集',
    markdown: {
        config: (md) => {
            md.use(demoblockPlugin);
        }
    },
    vite: {
        plugins: [
            Unocss(unocssCongfig),
            demoblockVitePlugin(),
            AutoImport({
                imports: ['vue'],
            }),
        ]
    },
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'directive', link: '/directive/', activeMatch: '/directive' },
            { text: 'components', link: '/package/', activeMatch: '/package' },
            { text: '工具函数', link: '/utils/download', activeMatch: '/utils' },
            { text: 'hooks', link: '/hooks/useFullScreen', activeMatch: '/hooks' },
            { text: 'other', link: '/other/unocssConfig', activeMatch: '/other' }
        ],

        sidebar: {
            directive: [
                {
                    text: '自定义指令',
                    items: [
                        { text: 'loading', link: '/directive/loading' },
                        { text: 'copy', link: '/directive/copy' },
                    ]
                }
            ],
            package: [
                {
                    text: '输入组件',
                    items: [
                        { text: 'cascader-radio', link: '/package/cascader-radio' },
                        { text: 'expandcontainer', link: '/package/expandcontainer' },
                        { text: 'searchscopeinput', link: '/package/searchscopeinput' },
                    ]
                },
                {
                    text: '弹窗',
                    items: [
                        { text: 'bottompopup', link: '/package/bottompopup' },
                    ]
                }
            ],
            utils: [
                {
                    text: '工具函数',
                    items: [
                        { text: '下载', link: '/utils/download' },
                    ]
                }
            ],
            hooks: [
                {
                    text: 'hooks',
                    items: [
                        { text: 'useFullScreen', link: '/hooks/useFullScreen' },
                        { text: 'useTabScroll', link: '/hooks/useTabScroll' },
                    ]
                }
            ],
            other: [
                {
                    text: 'other',
                    items: [
                        { text: 'unocss配置', link: '/other/unocssConfig' },
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/shiouhoo/hooui' }
        ],
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present shiouhoo'
        }
    }
});
