import type { Theme } from 'vitepress'
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'
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
import './style.css'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

export type SidebarOptions = VitePressSidebarOptions

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
} satisfies Theme
