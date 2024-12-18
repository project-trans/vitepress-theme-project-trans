<script lang="ts" setup>
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AppearanceToggle from './components/AppearanceToggle.vue'
import AppFooter from './components/AppFooter.vue'
import CopyrightInfo from './components/CopyrightInfo.vue'
import FontSwitcher from './components/FontSwitcher/FontSwitcher.vue'
import PageInfo from './components/PageInfo.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <AppearanceToggle>
    <Layout>
      <template #doc-before>
        <div class="vp-doc">
          <h1>{{ frontmatter.title }}</h1>
          <PageInfo />
          <CopyrightInfo />
        </div>
        <NolebaseHighlightTargetedHeading />
      </template>
      <template #doc-after>
        <AppFooter />
      </template>
      <template #nav-bar-content-after>
        <NolebaseEnhancedReadabilitiesMenu />
        <FontSwitcher />
      </template>
      <template #nav-screen-content-after>
        <NolebaseEnhancedReadabilitiesScreenMenu />
      </template>
    </Layout>
  </AppearanceToggle>
</template>

<style>
:root {
  --vp-font-family-base: sans-serif;
  --vp-font-family-mono: monospace;
}
</style>
