<script setup lang="ts">
const { borderRadiusCss } = useBorderRadius();
</script>

<template>
  <PanelContainer class="flex h-full flex-col gap-8 overflow-hidden p-4">
    <RadiusPreview class="flex-1" />

    <OutputCode title="CSS Output" :code="borderRadiusCss" />
  </PanelContainer>
</template>
