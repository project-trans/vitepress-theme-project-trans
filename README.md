# VitePress Theme Project Trans

这是一个由 Project Trans 开发的 VitePress 主题。

[构建效果](https://rle.wiki/)

## 功能

- 新增版权区
- 支持多字体切换
- 意见箱
- 页面历史记录
- 标题区域
  - 作者名称
  - 文档字数和预计阅读时间统计
  - 最后更新时间
- 使用 `<ArticlesMenu />` 在文章任意处插入目录
- 自定义 banner

## 使用方式

修改下述两个文件：

```typescript
// docs/.vitepress/config.ts
import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'

const themeConfig: ThemeContext = {
  siteTitle: 'RLE.wiki',
  siteDescription: '一份 RLE 指北',
  /** Repo */
  githubRepoLink: 'https://github.com/project-trans/RLE-wiki',
  /** vitepress 根目录 */
  rootDir: 'docs',
  /** 文档所在目录（目前似未使用此项） */
  include: ['campus', 'contributor-guide', 'fashion'],
  nav,
  sidebarOptions,
  /** 是否启用免责声明 banner，默认为不启用 */
  enableDisclaimer: true,
  disclaimerPaths: [{
    path: '/campus/', // 免责声明适用的目录前缀，不同目录前缀可以有不同的免责声明 banner
    summaryHtml: 'RLE.wiki「大学指南」中的内容，仅供参考。可能存在过时或不准确的信息，请谨慎甄别。', // 免责声明展开前显示的内容，html 格式
    detailHtml: '<p>RLE.wiki「大学指南」中的内容，仅供参考。可能存在过时或不准确的信息，请谨慎甄别。</p>' // 免责声明展开后显示的内容，html 格式
      + '<p>「大学指南」板块中的内容，多数来自于读者投稿，并经编辑简单整理和形式审查后登载，主要体现其投稿者主观观点。不代表 RLE.wiki 编辑团队及我们的任何相关维护人员立场。</p>'
      + '<p>若存在任何有误或不当内容，请联系 <a href="mailto:rlewiki@project-trans.org">rlewiki@project-trans.org</a>。</p>',
  },],
  disclaimerStatusKey: 'disclaimerStatus', // 若要存储免责声明 banner 隐藏状态，需要指定此字段，存储在localStorage中
  disclaimerStatusExpiration: 1000, // 指定 disclaimerStatus 有效的毫秒数，1000这个值显然太短了，你需要选个更大的数，默认持续生效7天

  // i18n
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
    en: {
      label: 'French',
      lang: 'fr', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/fr/', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的

      // 其余 locale 特定属性...
    },
  },
  // 添加自定义 head 元素
  additionalHead: [
    ['link', { rel: 'icon', href: 'https://rle.wiki/logo-with-shadow.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, genConfig)
```

```typescript
// docs/.vitepress/theme/index.ts
// https://vitepress.dev/guide/custom-theme
import PtjsTheme from '@project-trans/vitepress-theme-project-trans/theme'

import 'uno.css'
import './style.css'

export default {
  extends: PtjsTheme,
}
```

## 调试说明

1. 修改文件后在仓库根目录下进行构建
   - `pnpm i`
   - `pnpm build`
2. 切换到 example 路径下预览
   - `cd example`
   - `pnpm dev`
