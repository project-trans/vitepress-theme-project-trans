<script setup lang="ts">
import SuggestionBox from '@project-trans/suggestion-box/component'
</script>

<template>
  <SuggestionBox
    text-content-placeholder="这个页面有什么问题？或者有什么建议？请在下方留言，我们会尽快回复和处理。"
    target-url="https://suggestion-box.project-trans.org/api/v1/suggestion"
  />
</template>
