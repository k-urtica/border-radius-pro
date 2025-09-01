<script setup lang="ts">
import type { FileUploadEmits } from '@nuxt/ui';
import type { BaseSliderProps } from '@/components/base/BaseSlider.vue';

const { previewSize, previewBgUrl } = useAppearance();

const sizeSliderProps: BaseSliderProps = {
  min: 50,
  max: 600,
  step: 1,
  unit: 'px'
};

// TODO: https://github.com/nuxt/ui/issues/4852
const handleChangeFile = (file: unknown) => {
  const _file = file as FileUploadEmits['update:modelValue'][0];

  if (!_file) {
    previewBgUrl.value = undefined;
    return;
  }

  const url = useObjectUrl(_file).value;
  if (url) {
    previewBgUrl.value = url;
  }
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

      <UFormField label="Custom background">
        <UFileUpload
          label="Drop your image here"
          accept="image/*"
          size="sm"
          :multiple="false"
          class="min-h-10 w-full"
          @update:model-value="handleChangeFile"
        />
      </UFormField>
    </div>
  </section>
</template>
