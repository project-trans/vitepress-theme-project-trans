<script setup lang="ts">
import type { Node, Trie } from '../plugins/CopyrightLoader.data'
import { useData, useRoute } from 'vitepress' // 获取路由信息
import { computed, ref, watch } from 'vue'
import { data } from '../plugins/CopyrightLoader.data'

const orgName = useData().theme.value.org

const route = useRoute() // 获取当前路由对象

const attrs = computed(() => {
  const paths = route.path
    .replace('.md', '')
    .split('/')
    .filter((item: string) => item !== '')
  return searchClosestInTrie(data, paths)
})

function searchClosestInTrie(
  that: Trie<Record<string, any>>,
  path: string[],
  node: Node<Record<string, any>> = that.root,
): Record<string, any> | null {
  if (path.length === 0)
    return node.value
  if (path[0] in node.children) {
    let value = searchClosestInTrie(
      that,
      path.slice(1),
      node.children[path[0]],
    )
    if (value === null)
      value = node.value
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
</script>

<template>
  <div v-if="attrs?.copyright?.enable ?? false">
    <div class="tip custom-block">
      <p class="custom-block-title">
        Copyright
      </p>
      <p>
        <span>这篇文章 </span>
        <span>{{ `“${attrs!.title}”` }}</span>
        <span> 由 </span>
        <a v-if="attrs?.copyright?.url" :href="attrs.copyright.url">{{
          displayAuthors
        }}</a>
        <span v-else>{{ displayAuthors }}</span>
        <span> 创作</span>
        <span v-if="attrs?.copyright?.org && attrs?.copyright?.license">
          ，{{ attrs.copyright.org }} 在
          <a
            v-if="attrs?.copyright?.licenseUrl"
            :href="attrs.copyright.licenseUrl"
          >{{ attrs.copyright.license }}</a>
          <span v-else>{{ attrs.copyright.license }}</span>
          许可下使用
        </span>
        <span v-else-if="orgName && attrs?.copyright?.license">
          ，{{ orgName }} 在
          <a
            v-if="attrs?.copyright?.licenseUrl"
            :href="attrs.copyright.licenseUrl"
          >{{ attrs.copyright.license }}</a>
          <span v-else>{{ attrs.copyright.license }}</span>
          许可下使用
        </span>
        <span v-else-if="attrs?.copyright?.license">
          ，Project Trans 在
          <a
            v-if="attrs?.copyright?.licenseUrl"
            :href="attrs.copyright.licenseUrl"
          >{{ attrs.copyright.license }}</a>
          <span v-else>{{ attrs.copyright.license }}</span>
          许可下使用
        </span>
        <span>。</span>
      </p>
    </div>
    <hr>
  </div>
</template>
