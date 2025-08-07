<script setup lang="ts">
import type { BaseSliderProps } from '@/components/base/BaseSlider.vue';

const { previewSize } = useAppearance();

const sizeSliderProps: BaseSliderProps = {
  min: 50,
  max: 600,
  step: 1,
  unit: 'px'
};
</script>

<template>
  <section aria-label="Appearance settings">
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
        v-bind="sizeSliderProps"
        label="Width"
      />

      <BaseSlider
        v-model="previewSize.height"
        v-bind="sizeSliderProps"
        label="Height"
      />
    </div>
  </section>
</template>
