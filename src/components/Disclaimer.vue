<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { PjtsThemeConfig } from '../config'
import { DisclaimerPathConfig } from '../utils/themeContext';

const props = defineProps<{
  content?: string
}>()
const DEFAULT_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const route = useRoute()
const { theme } = useData<PjtsThemeConfig>()

const isExpanded = ref(false)
const isHidden = ref(false)

// Ref for the disclaimer element to measure its height
const disclaimerElement = ref<HTMLElement | null>(null)
// Ref to store the calculated height
const disclaimerHeight = ref(0)

// Computed properties for customizable button texts with defaults
const expandText = computed(() => theme.value?.disclaimerToggleExpandText || '展开')
const collapseText = computed(() => theme.value?.disclaimerToggleCollapseText || '收起')
const hideText = computed(() => theme.value?.disclaimerHideText || '我知道了')
const showText = computed(() => theme.value?.disclaimerShowText || '浮动显示')

// Find the disclaimer configuration matching the current path
const currentDisclaimerConfig = computed<DisclaimerPathConfig | undefined>(() => {
  if (!theme.value?.disclaimerPaths || !Array.isArray(theme.value.disclaimerPaths)) {
    return undefined
  }
  // Find the first config where the route path starts with the config path
  return theme.value.disclaimerPaths.find(config => route.path.startsWith(config.path))
})

// Computed property to determine if the toggle button should be shown
const showToggleButton = computed(() => {
  const config = currentDisclaimerConfig.value
  // Show if detailHtml exists and is different from summaryHtml
  return !!config?.detailHtml && config.detailHtml !== config.summaryHtml
})

// Computed property for the current disclaimer text to display
const currentDisclaimerText = computed(() => {
  const config = currentDisclaimerConfig.value
  if (!config) return '' // Should not happen if shouldRender is true, but good practice

  return isExpanded.value || isHidden.value
    ? config.detailHtml ?? config.summaryHtml // Fallback to summary if detail is missing but expanded
    : config.summaryHtml ?? ''
})

// 检查是否应该显示免责声明
const shouldRender = computed(() => {
  if (!theme.value?.enableDisclaimer) {
    return false
  }
  //   if (route.data?.frontmatter?.hideDisclaimer) {
  //     return false
  //   }

  // Check if a valid configuration is found for the current path
  return !!currentDisclaimerConfig.value
})

// Computed property for the placeholder's height
const placeholderHeight = computed(() => {
  // Placeholder should have height only when disclaimer is rendered and *not* hidden
  return shouldRender.value && !isHidden.value ? disclaimerHeight.value : 0
})

// Toggle the hidden state and update local storage with timestamp if enabled
const toggleHiddenState = () => {
  const localHiddenEnabled = !!theme.value?.disclaimerStatusKey

  if (isHidden.value) {
    // Show the disclaimer
    isHidden.value = false
    if (localHiddenEnabled) {
      localStorage.removeItem(theme.value?.disclaimerStatusKey!)
    }
  } else {
    // Hide the disclaimer
    isHidden.value = true
    if (localHiddenEnabled) {
      localStorage.setItem(theme.value?.disclaimerStatusKey!, Date.now().toString())
    }
  }
}

// Calculate the height of the disclaimer element
const calculateHeight = () => {
  // Only calculate height if the disclaimer element exists
  if (disclaimerElement.value) {
    const currentHeight = disclaimerElement.value.offsetHeight
    // Only update if the disclaimer is collapsed OR if we haven't captured a height yet.
    // This prevents overwriting the collapsed height when it expands.
    if (!isExpanded.value || disclaimerHeight.value === 0) {
      disclaimerHeight.value = currentHeight
    }
  }
  // No need for an else to set height to 0, the computed property handles that.
}

onMounted(() => {
  // Check local storage for hidden state if the feature is enabled
  const localHiddenEnabled = !!theme.value?.disclaimerStatusKey
  if (localHiddenEnabled) {
    const storedTimestampStr = localStorage.getItem(theme.value?.disclaimerStatusKey!)
    if (storedTimestampStr) {
      try {
        const storedTimestamp = parseInt(storedTimestampStr, 10)
        const expirationMs = theme.value?.disclaimerStatusExpiration ?? DEFAULT_EXPIRATION_MS
        const now = Date.now()

        if (now - storedTimestamp <= expirationMs) {
          // Timestamp is valid and not expired
          isHidden.value = true
        } else {
          // Timestamp expired, remove it
          localStorage.removeItem(theme.value?.disclaimerStatusKey!)
        }
      }
      catch {
        localStorage.removeItem(theme.value?.disclaimerStatusKey!)
      }
    }
  }

  // Calculate initial height after component mounts and renders
  nextTick(calculateHeight)
})

// Watch for changes that might affect the disclaimer's height
// We watch isExpanded to potentially capture the initial collapsed height if it wasn't ready on mount.
// We watch currentDisclaimerText because content changes can affect collapsed height.
watch([isExpanded, currentDisclaimerText], () => {
  // Recalculate height after DOM updates
  nextTick(calculateHeight)
}, {
  flush: 'post' // Ensure calculation happens after DOM updates
})
</script>

<template>
  <!-- Placeholder div to reserve space when the disclaimer is fixed -->
  <div v-if="shouldRender && !isHidden" class="disclaimer-placeholder" :style="{ height: placeholderHeight + 'px' }">
  </div>

  <!-- The actual disclaimer element -->
  <div v-if="shouldRender" ref="disclaimerElement" :class="[
    'disclaimer',
    { 'is-expanded': isExpanded },
    { 'is-hidden': isHidden }
  ]">
    <div class="disclaimer-content">
      <!-- Use v-html for rich text content -->
      <div class="disclaimer-text" :class="{ 'expanded': isExpanded && !isHidden }" v-html="currentDisclaimerText">
      </div>
      <div class="disclaimer-actions">
        <button v-if="showToggleButton && !isHidden" @click="isExpanded = !isExpanded" class="disclaimer-toggle">
          {{ isExpanded ? collapseText : expandText }}
        </button>
        <!-- Toggle hidden state and change text accordingly -->
        <button v-if="!isHidden" @click="toggleHiddenState" class="disclaimer-hide">
          {{ isHidden ? showText : hideText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disclaimer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
  padding: 1rem;
  z-index: 100;
}

.disclaimer.is-hidden {
  position: static;
  margin-top: 2rem;
  border: 1px solid transparent;
  border-radius: 8px;
}

.disclaimer-content {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.disclaimer-text {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.5;
}

.disclaimer-text.expanded {
  max-height: 300px;
  overflow-y: auto;
}

.disclaimer-actions {
  display: flex;
  gap: 0.5rem;
}

.disclaimer-toggle,
.disclaimer-hide {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.disclaimer-toggle:hover,
.disclaimer-hide:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .disclaimer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .disclaimer-actions {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: flex-end;
  }
}

/* Style for the placeholder - ensure it doesn't add extra margins/padding */
.disclaimer-placeholder {
  position: relative;
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}
</style>