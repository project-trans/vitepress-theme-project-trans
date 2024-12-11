import type { Theme } from 'vitepress'
import type Options from 'vitepress-sidebar'
// https://vitepress.dev/guide/custom-theme
import {
  NolebaseEnhancedReadabilitiesPlugin,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import {
  NolebaseGitChangelogPlugin,
} from '@nolebase/vitepress-plugin-git-changelog/client'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { onMounted } from 'vue'

import Layout from './Layout.vue'
import { addFontSwitchListener } from './plugins/fontSwitcher'
import './style.css'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

export type SidebarOptions = Options

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      spotlight: {
        defaultToggle: true,
      },
    })

    app.use(NolebaseGitChangelogPlugin, {
      locales: {
        'zh-CN': {
          lastEditedDateFnsLocaleName: 'zhCN',
        },
      },
    })
  },
  setup() {
    onMounted(() => {
      addFontSwitchListener() // 添加字体切换的事件监听器
    })
  },
} satisfies Theme
