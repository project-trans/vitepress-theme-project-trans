<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vitepress' // 获取路由信息
import type { Node, Trie } from '../plugins/CopyrightLoader.data'
import { data } from '../plugins/CopyrightLoader.data'

// 初始化需要更新的变量
const attrs = ref<Record<string, any> | null>(null)

const route = useRoute() // 获取当前路由对象

// 定义一个函数，基于当前路由路径更新数据
const updateData = () => {
  const paths = route.path.replace('.md', '').split('/').filter((item: string) => item !== '')
  attrs.value = searchClosestInTrie(data, paths)
}

function searchClosestInTrie(
  that: Trie<Record<string, any>>,
  path: string[],
  node: Node<Record<string, any>> = that.root,
): Record<string, any> | null {
  if (path.length === 0) return node.value
  if (path[0] in node.children) {
    let value = searchClosestInTrie(that, path.slice(1), node.children[path[0]])
    if (value === null) value = node.value
    return value
  }
  return node.value
}

// 计算页面的作者信息
const authors = computed(() => {
  let author = (attrs?.value?.author ?? []) as string[]
  if (!Array.isArray(author))
    author = [author]
  return author
})

// 计算显示的作者信息
const displayAuthors = computed(() => {
  return `${authors.value.join(' , ')}`
})

// 监听页面路由变化，路由变化时更新数据
watch(
  () => route.path,
  () => {
    updateData() // 路由变化时调用更新逻辑
  },
  { immediate: true } // 确保在初次加载时也能更新数据
)
</script>

<template>
  <div v-if="attrs?.copyright?.enable ?? false">
    <div class="tip custom-block">
      <p class="custom-block-title">Copyright</p>
      <p>
        <span>这篇文章 </span>
        <span>{{ `“${attrs.title}”` }}</span>
        <span> 由 </span>
        <a v-if="attrs?.copyright?.url" :href="attrs.copyright.url">{{ displayAuthors }}</a>
        <span v-else>{{ displayAuthors }}</span>
        <span> 创作</span>
        <span v-if="attrs?.copyright?.license">
          ，Project Trans 在 
          <a v-if="attrs?.copyright?.licenseUrl" :href="attrs.copyright.licenseUrl">{{ attrs.copyright.license }}</a>
          <span v-else>{{ attrs.copyright.license }}</span>
          许可下使用
        </span>
        <span>。</span>
      </p>
    </div>
    <hr>
  </div>
</template>
