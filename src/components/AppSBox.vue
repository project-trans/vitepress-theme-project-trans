<script setup lang="ts">
import SuggestionBox from '@project-trans/suggestion-box/component'
</script>

<template>
  <SuggestionBox
    text-content-placeholder="这个页面有什么问题？或者有什么建议？请在下方留言，我们会尽快回复和处理。"
    target-url="https://suggestion-box.project-trans.org/api/v1/suggestion"
  />
</template>

<style scoped>
/* to set suggestionbox's style */
form {
  --c-bg-opacity: 1;
  --c-border-light: rgb(228 228 231 / var(--c-bg-opacity));
  --c-border-dark: rgb(39 39 42 / var(--c-bg-opacity));
  --c-textarea-bg-light: rgb(255 255 255 / var(--c-bg-opacity));
  --c-textarea-bg-dark: #1b1b1f;
  --c-textarea-disabled-text: rgb(161 161 170);
  --c-contact-bg-light: rgb(244 244 245 / var(--c-bg-opacity));
  --c-contact-bg-dark: rgb(24 24 27 / var(--c-bg-opacity));
  --c-action-bg-light: rgb(250 250 250 / var(--c-bg-opacity));
  --c-action-bg-dark: rgb(24 24 27 / var(--c-bg-opacity));
}
</style>
