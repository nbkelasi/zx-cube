import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/zx-cube/',
  title: "ZXui",
  description: "A VitePress Site",
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '快速使用',
        items: [
          { text: '全局导入', link: '/markdown-examples' },
          { text: '局部导入', link: '/api-examples' }
        ]
      },
      {
        text: 'Basic',
        items: [
          {text: 'Button', link: '/components/button'},
          {text: 'Alert', link: '/components/alert' },
          {text: 'Collapse', link: '/components/collapse'},
          {text: 'Dropdown', link: '/components/dropdown'},
          {text: 'Input', link: '/components/input'},
          {text: 'Switch', link: '/components/switch'},
          {text: 'Select', link: '/components/select'},
          {text: 'Form', link: '/components/form'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
