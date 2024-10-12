# VitePress Theme Project Trans

这是一个由 Project Trans 开发的 VitePress 主题。

[构建效果](https://rle.wiki/)

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