<script setup lang="ts">
const { previewSize } = useAppearance();
</script>

<template>
  <div>
    <BaseIconText
      as="h3"
      icon="i-lucide-palette"
      class="mb-3 font-semibold"
    >
      Appearance
    </BaseIconText>
    <div class="space-y-4">
      <BaseSlider
        v-model="previewSize.width"
        label="Width"
        :min="50"
        :max="500"
        :step="1"
        unit="px"
      />

      <BaseSlider
        v-model="previewSize.height"
        label="Height"
        :min="50"
        :max="500"
        :step="1"
        unit="px"
      />
    </div>
  </div>
</template>
