<script setup lang="ts">
import { useStorage } from '@vueuse/core'

defineProps<{ fontName: string }>()
const activeFont = useStorage('activeFont', '')
</script>

<template>
  <div class="VPMenuLink" @click="activeFont = fontName">
    <span class="link" :class="[activeFont === fontName && 'active']">{{ fontName }}</span>
  </div>
</template>

<style lang="css" scoped>
.link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.link.active {
  color: var(--vp-c-brand-1);
}
</style>
