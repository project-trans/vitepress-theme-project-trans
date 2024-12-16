import type {
  SidebarItem,
  SidebarMultiItem,
  VitePressSidebarOptions,
} from 'vitepress-sidebar/types'
import { generateSidebar as genSidebar } from 'vitepress-sidebar'
import { useThemeContext } from './utils/themeContext'

export function generateSidebar() {
  const { sidebarOptions } = useThemeContext()
  const optionMap: Map<string, VitePressSidebarOptions> = new Map(sidebarOptions.map(obj => [obj.resolvePath!.toString(), obj]))
  const sidebar = genSidebar(sidebarOptions)
  for (const key in sidebar) {
    const sidebarMultiItem: SidebarMultiItem = (sidebar as any)[key]
    if (optionMap.get(sidebarMultiItem.base)?.sortMenusByFrontmatterOrder !== true) {
      sidebarMultiItem.items.sort(sidebarTitleSorter)
    }
  }
  return sidebar
}

function sidebarTitleSorter(infoA: SidebarItem, infoB: SidebarItem): number {
  const textA = infoA.text
  const textB = infoB.text
  if (textA === undefined || textB === undefined)
    return 0

  const infoANfc = textA.normalize('NFC')
  const infoBNfc = textB.normalize('NFC')
  return infoANfc.localeCompare(infoBNfc, 'zh', {
    numeric: true,
  })
}
