import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import AutoImport from 'unplugin-auto-import/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "hooui",
    //   base: "/hooui",
    description: "这是一个常用的vue3组件库",
    markdown: {
        config: (md) => {
            md.use(demoblockPlugin)
        }
    },
    vite: {
        plugins: [
            demoblockVitePlugin(),
            AutoImport({
                imports: ['vue'],
            }),
        ]
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'directive', link: '/directive/', activeMatch: '/directive' },
            { text: 'components', link: '/package/expandcontainer', activeMatch: '/package' }
        ],

        sidebar: {
            'directive': [
                {
                    text: '自定义指令',
                    items: [
                        { text: 'index', link: '/directive/' },
                        { text: 'loading', link: '/directive/loading' },
                        { text: 'copy', link: '/directive/copy' },
                    ]
                }
            ],
            'package': [
                {
                    text: '输入组件',
                    items: [
                        { text: 'expandcontainer', link: '/package/expandcontainer' },
                        { text: 'searchscopeinput', link: '/package/searchscopeinput' },
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/shiouhoo/hooui' }
        ],
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present shiouhoo'
        }
    }
})
