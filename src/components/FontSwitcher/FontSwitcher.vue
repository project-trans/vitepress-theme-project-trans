<script setup lang="tsx">
import { useStorage } from '@vueuse/core'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import { watchEffect } from 'vue'
import FontSwitcherItem from './FontSwitcherItem.vue'

const activeFont = useStorage('activeFont', '')

watchEffect(() => {
  document.documentElement.style.setProperty(
    '--main-font',
    activeFont.value,
  )
})

const items = [
  {
    name: '黑体',
    value: 'sans',
  },
  {
    name: '宋体',
    value: 'serif',
  },
  {
    name: '更纱黑体',
    value: 'Sarasa UI SC',
  },
  {
    name: '思源宋体',
    value: 'Source Han Serif CN',
  },
  {
    name: '霞鹜文楷',
    value: 'LXGW WenKai',
  },
  {
    name: '霞鹜文楷 Mono',
    value: 'LXGW WenKai Mono',
  },
  {
    name: '霞鹜新晰黑',
    value: 'LXGW Neo XiHei',
  },
  {
    name: '新晰黑 Code',
    value: 'NeoXiHei Code',
  },
  {
    name: '默认字体',
    value: '',
  },
].map(item => ({
  component: <FontSwitcherItem fontName={item.name} value={item.value} />,
}))
</script>

<template>
  <VPFlyout icon="i-octicon:typography-16" :items="items" />
</template>

<style lang="css" scoped>
.VPMenuGroup + .VPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}
</style>
