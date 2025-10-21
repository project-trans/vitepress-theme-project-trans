import type {
  SidebarMultiItem,
  VitePressSidebarOptions,
} from 'vitepress-sidebar/types'
import { generateSidebar as genSidebar } from 'vitepress-sidebar'
import { useThemeContext } from './utils/themeContext'
import { titleSorter } from './utils/titleSorter'

export function generateSidebar() {
  const { sidebarOptions } = useThemeContext()
  const optionMap: Map<string, VitePressSidebarOptions> = new Map(sidebarOptions.map(obj => [obj.resolvePath!.toString(), obj]))
  const sidebar = genSidebar(sidebarOptions)
  for (const key in sidebar) {
    const sidebarMultiItem: SidebarMultiItem = (sidebar as any)[key]
    if (optionMap.get(sidebarMultiItem.base)?.sortMenusByFrontmatterOrder !== true) {
      sidebarMultiItem.items.sort(titleSorter)
    }
  }
  return sidebar
}
