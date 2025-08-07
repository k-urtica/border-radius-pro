<script setup lang="ts">
import type { RadiusAdvanced8 } from '~/composables/useBorderRadius';

const model = defineModel<RadiusAdvanced8>({ required: true });

const RADIUS_SLIDER_RANGE = {
  min: 0,
  max: 100
} as const;
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div class="space-y-2.5">
      <h4 class="text-xs font-medium text-muted">Top Left Corner</h4>
      <BaseSlider
        v-model="model.topLeft.horizontal"
        label="Horizontal"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="model.topLeft.vertical"
        label="Vertical"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
    </div>
    <div class="space-y-2.5">
      <h4 class="text-xs font-medium text-muted">Top Right Corner</h4>
      <BaseSlider
        v-model="model.topRight.horizontal"
        label="Horizontal"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="model.topRight.vertical"
        label="Vertical"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
    </div>
    <div class="space-y-2.5">
      <h4 class="text-xs font-medium text-muted">Bottom Right Corner</h4>
      <BaseSlider
        v-model="model.bottomRight.horizontal"
        label="Horizontal"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="model.bottomRight.vertical"
        label="Vertical"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
    </div>
    <div class="space-y-2.5">
      <h4 class="text-xs font-medium text-muted">Bottom Left Corner</h4>
      <BaseSlider
        v-model="model.bottomLeft.horizontal"
        label="Horizontal"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="model.bottomLeft.vertical"
        label="Vertical"
        unit="%"
        v-bind="RADIUS_SLIDER_RANGE"
      />
    </div>
  </div>
</template>
