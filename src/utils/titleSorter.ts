import type { SidebarItem } from 'vitepress-sidebar/types'

export function titleSorter(infoA: SidebarItem, infoB: SidebarItem): number {
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
