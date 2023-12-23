import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "hooui",
  description: "这是一个常用的vue3组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'directive', link: '/directive/loading' }
    ],

    sidebar: [
      {
        text: '自定义指令',
        items: [
          { text: 'loading', link: '/directive/loading' },
        ]
      }
    ],

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