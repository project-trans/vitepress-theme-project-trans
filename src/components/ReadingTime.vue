<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, watch } from 'vue'

// 获取页面数据
const { frontmatter } = useData()

// 计算阅读时间的函数
function calculateReadingTime(wordCount: number) {
  const wordsPerMinute = 500 // 假设中文阅读速度为每分钟500字
  return Math.ceil(wordCount / wordsPerMinute) // 计算预计阅读时间
}

// 使用 ref 创建响应式变量
const wordCount = ref(frontmatter.value.wordCount || 0)
const readingTime = ref(calculateReadingTime(wordCount.value))

// 监听 frontmatter 的变化
watch(() => frontmatter.value, (newFrontmatter) => {
  wordCount.value = newFrontmatter.wordCount || 0
  readingTime.value = calculateReadingTime(wordCount.value)
})
</script>

<template>
  <div class="inline-flex items-center gap-4">
    <div class="inline-flex items-center gap-1">
      <span class="i-octicon:pencil-16" />
      <span>字数: {{ wordCount }} </span>
    </div>
    <div class="inline-flex items-center gap-1">
      <span class="i-octicon:book-16" />
      <span>预计阅读时间: {{ readingTime }} 分钟</span>
    </div>
  </div>
</template>

<style scoped>
/* 这里可以添加样式 */
</style>
