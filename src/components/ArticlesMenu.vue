<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { titleSorter } from '../utils/titleSorter'
import { data } from './articlesmenu.data'

const { sortByPinyin = false } = defineProps<{ sortByPinyin?: boolean }>()
const route = useRoute()
const articles = computed(() => {
  const result = data
    .filter((article) => {
      if (!article.url.startsWith(route.path))
        return false
      if (article.url === route.path)
        return false
      const relateUrl = article.url.replace(route.path, '')
      const slashCount = relateUrl.split('/').length - 1
      if (slashCount > 1)
        return false
      if (slashCount === 1 && !relateUrl.endsWith('/'))
        return false
      return true
    })
    .map(article => ({ link: article.url, text: article.title }))
  if (sortByPinyin) {
    result.sort(titleSorter)
  }
  return result
},
)
</script>

<template>
  <ul>
    <li v-for="article in articles" :key="article.link">
      <a :href="article.link">{{ article.text }}</a>
    </li>
  </ul>
</template>
