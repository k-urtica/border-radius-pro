<script setup lang="ts">
import type { RadiusAdvanced4 } from '~/composables/useBorderRadius';

const model = defineModel<RadiusAdvanced4>({ required: true });

const RADIUS_SLIDER_RANGE = {
  min: 0,
  max: 100
} as const;
</script>

<template>
  <div class="space-y-5">
    <BaseSlider
      v-model="model.top"
      label="Top Edge"
      unit="%"
      v-bind="RADIUS_SLIDER_RANGE"
    />
    <BaseSlider
      v-model="model.right"
      label="Right Edge"
      unit="%"
      v-bind="RADIUS_SLIDER_RANGE"
    />
    <BaseSlider
      v-model="model.bottom"
      label="Bottom Edge"
      unit="%"
      v-bind="RADIUS_SLIDER_RANGE"
    />
    <BaseSlider
      v-model="model.left"
      label="Left Edge"
      unit="%"
      v-bind="RADIUS_SLIDER_RANGE"
    />
  </div>
</template>
