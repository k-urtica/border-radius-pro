<script setup lang="ts">
import type { BorderRadiusUnit, RadiusBasic } from '~/composables/useBorderRadius';

const model = defineModel<RadiusBasic>({ required: true });

defineProps<{
  unit?: BorderRadiusUnit;
}>();

const RADIUS_SLIDER_RANGE = {
  min: 0,
  max: 100
} as const;

const allCorners = ref(model.value.topLeft);

const handleAllCornersChange = (value: number) => {
  model.value.topLeft = value;
  model.value.topRight = value;
  model.value.bottomRight = value;
  model.value.bottomLeft = value;
};
</script>

<template>
  <div class="space-y-5">
    <BaseSlider
      v-model="allCorners"
      label="All Corners"
      :unit="unit"
      v-bind="RADIUS_SLIDER_RANGE"
      @update:model-value="handleAllCornersChange"
    />

    <BaseSlider
      v-model="model.topLeft"
      label="Top Left"
      :unit="unit"
      v-bind="RADIUS_SLIDER_RANGE"
    />
    <BaseSlider
      v-model="model.topRight"
      label="Top Right"
      :unit="unit"
      v-bind="RADIUS_SLIDER_RANGE"
    />
    <BaseSlider
      v-model="model.bottomRight"
      label="Bottom Right"
      :unit="unit"
      v-bind="RADIUS_SLIDER_RANGE"
    />
    <BaseSlider
      v-model="model.bottomLeft"
      label="Bottom Left"
      :unit="unit"
      v-bind="RADIUS_SLIDER_RANGE"
    />
  </div>
</template>
