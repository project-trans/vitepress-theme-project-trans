import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'

const nav: NavConfig = [
  {
    text: '大学指南',
    link: '/campus/',
  },
  {
    text: '贡献指南',
    items: [
      {
        text: '校园版块投稿指南',
        link: '/contributor-guide/campus.md',
      },
      {
        text: '其他投稿指南',
        link: '/contributor-guide/other.md',
      },
      {
        text: '校园版块贡献模板',
        link: '/contributor-guide/CampusTemplate.md',
      },
    ],
  },
]

const baseConfig = {
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  collapsed: true,
  documentRootPath: '/docs',
} satisfies Partial<SidebarOptions>

const sidebarOptions = [
  {
    ...baseConfig,
    scanStartPath: 'campus',
    resolvePath: '/campus/',
    sortMenusByFrontmatterOrder: true,
  },
]

const themeConfig: ThemeContext = {
  siteTitle: 'RLE.wiki',
  siteDescription: '一份 RLE 指北',
  // baseUrl: '/',
  /** Repo */
  githubRepoLink: 'https://github.com/project-trans/RLE-wiki',
  /** vitepress 根目录 */
  rootDir: 'docs',
  /** 文档所在目录（目前似未使用此项） */
  include: ['campus', 'contributor-guide', 'fashion'],
  nav,
  sidebarOptions,
  // enableChangeLog: false,
  enableSuggestionBox: false,
  // HideReadingTime: true, /* 隐藏字数和预计阅读时间 */
  // HideLastUpdated: true, /* 隐藏最后更新时间 */
  // HideAuthors: true, /* 隐藏作者信息 */
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, genConfig)
