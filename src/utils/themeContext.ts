import type { DefaultTheme } from 'vitepress'
import type { generateSidebar, VitePressSidebarOptions } from 'vitepress-sidebar'
import { AsyncLocalStorage } from 'node:async_hooks'

type NavConfig = DefaultTheme.Config['nav']

export interface ThemeContext {
  siteTitle: string
  siteLogo: string
  SiteTitle: string
  baseUrl?: string
  siteDescription: string
  githubRepoLink: string
  rootDir: string
  include: string[]
  nav: NavConfig
  sidebarOptions: VitePressSidebarOptions[]
  enableSuggestionBox?: boolean
  enableChangeLog?: boolean
  sitePattern?: string
  org?: string
  HideReadingTime?: string
  HideLastUpdated?: string
  HideAuthors?: string
}

const themeContext = new AsyncLocalStorage<ThemeContext>()

export function withThemeContext<T>(context: ThemeContext, fn: () => T): T {
  return themeContext.run(context, fn)
}

export function useThemeContext(): ThemeContext {
  return themeContext.getStore()!
}
