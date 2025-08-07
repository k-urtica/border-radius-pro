<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';

const { radiusBasic, unit, } = useBorderRadius();

const allCorners = ref(radiusBasic.value.topLeft);

const unitItems = [
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' },
  { label: 'rem', value: 'rem' }
] as const satisfies RadioGroupItem[];

const handleAllCornersChange = (value: number) => {
  radiusBasic.value.topLeft = value;
  radiusBasic.value.topRight = value;
  radiusBasic.value.bottomRight = value;
  radiusBasic.value.bottomLeft = value;
};
</script>

<template>
  <div class="space-y-5">
    <div class="space-y-4">
      <BaseSlider
        v-model="allCorners"
        label="All Corners"
        :unit="unit"
        v-bind="RADIUS_SLIDER_RANGE"
        @update:model-value="handleAllCornersChange"
      />

      <BaseSlider
        v-model="radiusBasic.topLeft"
        label="Top Left"
        :unit="unit"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="radiusBasic.topRight"
        label="Top Right"
        :unit="unit"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="radiusBasic.bottomRight"
        label="Bottom Right"
        :unit="unit"
        v-bind="RADIUS_SLIDER_RANGE"
      />
      <BaseSlider
        v-model="radiusBasic.bottomLeft"
        label="Bottom Left"
        :unit="unit"
        v-bind="RADIUS_SLIDER_RANGE"
      />
    </div>

    <BaseRadioGroup
      v-model="unit"
      :items="unitItems"
      label="Unit"
      label-icon="i-lucide-ruler"
    />
  </div>
</template>
