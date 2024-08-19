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
            { text: '工具函数', link: '/utils/copyRichTextToClipboard', activeMatch: '/utils' },
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
                        { text: 'CascaderMultiple 多选级联选择', link: '/package/cascader-multiple' },
                        { text: 'CascaderRadio 单选级联选择', link: '/package/cascader-radio' },
                        { text: 'ExpandContainer 展开收起容器', link: '/package/expandcontainer' },
                        { text: 'SearchScopeInput 下拉输入搜索框', link: '/package/searchscopeinput' },
                    ]
                },
                {
                    text: '展示组件',
                    items: [
                        { text: 'ScopeList 局部滚动列表', link: '/package/scope-list' },
                    ]
                },
                {
                    text: '弹窗',
                    items: [
                        { text: 'BottomPopup 底部弹窗', link: '/package/bottompopup' },
                    ]
                }
            ],
            utils: [
                {
                    text: '工具函数',
                    items: [
                        { text: '富文本复制', link: '/utils/copyRichTextToClipboard' },
                        { text: '下载', link: '/utils/download' },
                    ]
                }
            ],
            hooks: [
                {
                    text: 'hooks',
                    items: [
                        { text: 'useFullScreen', link: '/hooks/useFullScreen' },
                        { text: 'usePreconditionFunc', link: '/hooks/usePreconditionFunc' },
                        { text: 'useTabScroll', link: '/hooks/useTabScroll' },
                    ]
                }
            ],
            other: [
                {
                    text: 'other',
                    items: [
                        { text: 'unocss配置', link: '/other/unocssConfig' },
                        { text: 'nginx配置', link: '/other/nginxConfig' },
                        { text: 'axios取消请求', link: '/other/singleAxios' },
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
