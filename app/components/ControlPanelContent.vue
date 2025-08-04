<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { Preset } from '~/composables/usePresets';

const unitItems = [
  { label: 'px', value: 'px' },
  { label: '%', value: '%' },
  { label: 'em', value: 'em' },
  { label: 'rem', value: 'rem' }
] as const satisfies RadioGroupItem[];

const { radiusBasic, radiusAdvanced4, radiusAdvanced8, controlMode, unit, } = useBorderRadius();
const { applyPreset, getPresetsByMode } = usePresets();

const controlModeItems = [
  { label: 'Basic', value: CONTROL_MODES.basic },
  { label: '4-Corner', value: CONTROL_MODES.advanced4 },
  { label: '8-Value', value: CONTROL_MODES.advanced8 }
];

const handlePresetSelect = (preset: Preset) => {
  applyPreset(preset);
};
</script>

<template>
  <div>
    <BaseIconText
      as="h3"
      icon="i-lucide-settings-2"
      class="mb-3 font-semibold"
    >
      Radius Settings
    </BaseIconText>

    <div class="flex flex-col gap-5">
      <BaseTabsSelector
        v-model="controlMode"
        label="Control Mode"
        label-icon="i-lucide-scan"
        :items="controlModeItems"
      />

      <PresetList
        :presets="getPresetsByMode(controlMode)"
        class="border-b pb-5"
        @preset-select="handlePresetSelect"
      />

      <template v-if="controlMode === CONTROL_MODES.basic">
        <RadiusBasicFields
          v-model="radiusBasic"
          :unit="unit"
        />
        <BaseRadioGroup
          v-model="unit"
          :items="unitItems"
          label="Unit"
          label-icon="i-lucide-ruler"
        />
      </template>

      <RadiusFourFields
        v-else-if="controlMode === CONTROL_MODES.advanced4"
        v-model="radiusAdvanced4"
      />
      <RadiusEightFields
        v-else-if="controlMode === CONTROL_MODES.advanced8"
        v-model="radiusAdvanced8"
      />
    </div>
  </div>
</template>
