<script setup lang="ts">
import type { BaseSliderProps } from '@/components/base/BaseSlider.vue';

const { previewSize, previewBgUrl } = useAppearance();

const sizeSliderProps: BaseSliderProps = {
  min: 50,
  max: 600,
  step: 1,
  unit: 'px'
};

const handleChangeFile = (file: File | undefined) => {
  const url = file ? useObjectUrl(file).value : undefined;
  if (url) {
    previewBgUrl.value = url;
  }
};

const handleClearFile = () => {
  previewBgUrl.value = undefined;
};
</script>

<template>
  <section aria-label="Appearance settings">
    <BaseIconText
      as="h3"
      icon="i-lucide-palette"
      class="mb-2 font-semibold"
    >
      Appearance
    </BaseIconText>
    <div class="space-y-5">
      <div class="space-y-2">
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

      <BaseFileInput
        label="Custom background"
        clear-tooltip="Clear background"
        accept="image/*"
        @change="handleChangeFile"
        @clear="handleClearFile"
      />
    </div>
  </section>
</template>
