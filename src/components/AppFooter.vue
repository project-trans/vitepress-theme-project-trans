<script setup lang="ts">
import type { PjtsThemeConfig } from '../config'
import { NolebaseGitChangelog } from '@nolebase/vitepress-plugin-git-changelog/client'
import { useData, useRoute } from 'vitepress'
import { ref, watch } from 'vue'
import { AppSBox, Disclaimer } from '../components'

const route = useRoute()
const { theme } = useData<PjtsThemeConfig>()

// 定义一个 ref 来存储动态 key
const componentKey = ref(0)
const frontmatter = ref(route.data?.frontmatter)
const isFrontmatterLoaded = ref(false)

// 更新 key 和 frontmatter 的函数
function updateKeyAndFrontmatter() {
  componentKey.value += 1
  frontmatter.value = route.data?.frontmatter || {}
  isFrontmatterLoaded.value = true
}

// 监听路由变化，更新 key 和 frontmatter
watch(
  () => route.path,
  () => {
    isFrontmatterLoaded.value = false
    updateKeyAndFrontmatter()
  },
  { immediate: true },
) // 在组件挂载时立即执行一次，确保第一次渲染时 key 和 frontmatter 是正确的

// 在组件挂载时更新 key 和 frontmatter
// onMounted(updateKeyAndFrontmatter);
</script>

<template>
  <div :key="componentKey" class="vp-doc">
    <h2 v-if="theme.enableSuggestionBox" id="意见反馈">
      意见反馈
    </h2>
    <AppSBox v-if="theme.enableSuggestionBox" />
    <!-- 仅在 Frontmatter 加载完成且未设置 hideChangelog 时渲染 GitChangelog -->
    <NolebaseGitChangelog
      v-if="
        isFrontmatterLoaded
          && theme.enableChangeLog
          && !frontmatter.hideChangelog
      "
    />
    <Disclaimer />
  </div>
</template>
