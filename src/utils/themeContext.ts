import type { DefaultTheme } from 'vitepress'
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'
import { AsyncLocalStorage } from 'node:async_hooks'

type NavConfig = DefaultTheme.NavItem[]

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
  HideReadingTime?: boolean
  HideLastUpdated?: boolean
  HideAuthors?: boolean
  hostName: string
  fontsBaseUrl?: string
}

const themeContext = new AsyncLocalStorage<ThemeContext>()

export function withThemeContext<T>(context: ThemeContext, fn: () => T): T {
  return themeContext.run(context, fn)
}

export function useThemeContext(): ThemeContext {
  return themeContext.getStore()!
}
