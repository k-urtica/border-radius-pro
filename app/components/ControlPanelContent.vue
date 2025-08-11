<script setup lang="ts">
import type { Preset } from '~/composables/usePresets';

const { radiusAdvanced4, radiusAdvanced8, controlMode, } = useBorderRadius();
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
  <div class="space-y-5">
    <section aria-label="Border radius settings">
      <BaseIconText
        as="h3"
        icon="i-lucide-settings-2"
        class="mb-2 font-semibold"
      >
        Radius Settings
      </BaseIconText>

      <div class="space-y-4">
        <BaseTabsSelector
          v-model="controlMode"
          label="Control Mode"
          label-icon="i-lucide-scan"
          :items="controlModeItems"
        />
        <PresetList
          :presets="getPresetsByMode(controlMode)"
          @preset-select="handlePresetSelect"
        />

        <RadiusBasicSettings v-if="controlMode === CONTROL_MODES.basic" />

        <RadiusFourSettings
          v-else-if="controlMode === CONTROL_MODES.advanced4"
          v-model="radiusAdvanced4"
        />
        <RadiusEightSettings
          v-else-if="controlMode === CONTROL_MODES.advanced8"
          v-model="radiusAdvanced8"
        />
      </div>
    </section>

    <USeparator />

    <AppearanceSettings />
  </div>
</template>
