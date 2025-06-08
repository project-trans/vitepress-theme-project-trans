import type { DefaultTheme } from 'vitepress'
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'
import { AsyncLocalStorage } from 'node:async_hooks'

type NavConfig = DefaultTheme.NavItem[]

export interface DisclaimerPathConfig {
  path: string // The path prefix to match
  summaryHtml: string // HTML content for the summary view
  detailHtml?: string // Optional HTML content for the detailed view
}

// 支持 vitepress 官方 i18n
export interface LocalesConfig {
  label: string
  lang: string
  link?: string
}

export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

export interface ThemeContext {
  siteTitle: string
  siteLogo: string
  SiteTitle?: string
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
  enableDisclaimer?: boolean
  disclaimerPaths?: DisclaimerPathConfig[]
  disclaimerStatusKey?: string
  disclaimerStatusExpiration?: number
  locales?: { [key: string]: LocalesConfig } // i18n
  additionalHead?: HeadConfig[] // Additional head elements
}

const themeContext = new AsyncLocalStorage<ThemeContext>()

export function withThemeContext<T>(context: ThemeContext, fn: () => T): T {
  return themeContext.run(context, fn)
}

export function useThemeContext(): ThemeContext {
  return themeContext.getStore()!
}
