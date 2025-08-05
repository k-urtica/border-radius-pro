<script setup lang="ts">
const { borderRadiusCss } = useBorderRadius();
</script>

<template>
  <PanelContainer class="flex h-full flex-col gap-8 overflow-hidden p-5">
    <section class="flex h-full min-h-0 flex-1 flex-col">
      <RadiusPreview />
    </section>

    <OutputCode title="CSS Output" :code="borderRadiusCss" />
  </PanelContainer>
</template>
