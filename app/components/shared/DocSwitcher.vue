<script setup lang="ts">
const { isDocVisible, toggleDoc } = useDocToggle();

const tipText = computed(() => isDocVisible ? 'Hide documentation' : 'Show documentation');
</script>

<template>
  <UTooltip :text="tipText" arrow>
    <UButton
      variant="outline"
      size="sm"
      :color="isDocVisible ? 'primary' : 'neutral'"
      :icon="isDocVisible ? 'i-lucide-book-open' : 'i-lucide-book'"
      :aria-label="tipText"
      label="Docs"
      class="rounded-full"
      @click="toggleDoc"
    />
  </UTooltip>
</template>
