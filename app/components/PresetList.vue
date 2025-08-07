<script setup lang="ts">
import type { Preset } from '~/composables/usePresets';

defineProps<{
  presets: Preset[];
}>();

const emit = defineEmits<{
  presetSelect: [preset: Preset];
}>();

const { getBasicRadiusValue, getAdvanced4RadiusValue, getAdvanced8RadiusValue } = useBorderRadius();

const handlePresetClick = (preset: Preset) => {
  emit('presetSelect', preset);
};

const previewStyle = (preset: Preset): string => {
  if (preset.type === CONTROL_MODES.basic) {
    return getBasicRadiusValue(preset.values, preset.unit);
  } else if (preset.type === CONTROL_MODES.advanced4) {
    return getAdvanced4RadiusValue(preset.values);
  } else {
    return getAdvanced8RadiusValue(preset.values);
  }
};
</script>

<template>
  <div>
    <BaseIconText
      as="h4"
      icon="i-lucide-shapes"
      class="mb-2 text-sm"
    >
      Presets
    </BaseIconText>

    <ul
      class="grid grid-cols-3 gap-2"
      aria-label="Border radius presets"
    >
      <li
        v-for="preset in presets"
        :key="preset.name"
      >
        <UButton
          variant="soft"
          size="sm"
          class="flex w-full flex-col gap-1.5 ring-1 ring-muted/70"
          :aria-label="`Apply preset: ${preset.name}`"
          @click="handlePresetClick(preset)"
        >
          <div
            class="size-4 border-2 border-inverted/70"
            :style="{ borderRadius: previewStyle(preset) }"
          />
          <span class="text-xs leading-tight font-medium text-toned">
            {{ preset.name }}
          </span>
        </UButton>
      </li>
    </ul>
  </div>
</template>
