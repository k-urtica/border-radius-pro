import type { BorderRadiusUnit, ControlMode, RadiusAdvanced4, RadiusAdvanced8, RadiusBasic } from '@/composables/useBorderRadius';

/**
 * Basic preset type definition
 */
export interface PresetBase {
  name: string;
}

/**
 * Basic mode preset (with unit)
 */
export interface BasicPresetWithUnit extends PresetBase {
  type: typeof CONTROL_MODES.basic;
  values: RadiusBasic;
  unit: BorderRadiusUnit;
}

/**
 * 4-Corner mode preset
 */
export interface Advanced4Preset extends PresetBase {
  type: typeof CONTROL_MODES.advanced4;
  values: RadiusAdvanced4;
}

/**
 * 8-Value mode preset
 */
export interface Advanced8Preset extends PresetBase {
  type: typeof CONTROL_MODES.advanced8;
  values: RadiusAdvanced8;
}

/**
 * Union type for all presets
 */
export type Preset = BasicPresetWithUnit | Advanced4Preset | Advanced8Preset;

/**
 * Preset data for Basic mode
 */
export const BASIC_PRESETS: BasicPresetWithUnit[] = [
  {
    name: 'None',
    type: CONTROL_MODES.basic,
    unit: 'px',
    values: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 }
  },
  {
    name: 'Small',
    type: CONTROL_MODES.basic,
    unit: 'px',
    values: { topLeft: 4, topRight: 4, bottomRight: 4, bottomLeft: 4 }
  },
  {
    name: 'Medium',
    type: CONTROL_MODES.basic,
    unit: 'px',
    values: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
  },
  {
    name: 'Large',
    type: CONTROL_MODES.basic,
    unit: 'px',
    values: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
  },
  {
    name: 'Pill',
    type: CONTROL_MODES.basic,
    unit: '%',
    values: { topLeft: 100, topRight: 100, bottomRight: 100, bottomLeft: 100 }
  },
  {
    name: 'Card',
    type: CONTROL_MODES.basic,
    unit: '%',
    values: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
];

/**
 * Preset data for 4-Corner mode
 */
export const ADVANCED4_PRESETS: Advanced4Preset[] = [
  {
    name: 'Organic',
    type: CONTROL_MODES.advanced4,
    values: { top: 75, right: 25, bottom: 60, left: 40 }
  },
  {
    name: 'Teardrop',
    type: CONTROL_MODES.advanced4,
    values: { top: 90, right: 10, bottom: 40, left: 60 }
  },
  {
    name: 'Leaf',
    type: CONTROL_MODES.advanced4,
    values: { top: 85, right: 15, bottom: 15, left: 85 }
  },
  {
    name: 'Pebble',
    type: CONTROL_MODES.advanced4,
    values: { top: 65, right: 35, bottom: 50, left: 50 }
  },
  {
    name: 'Fluid',
    type: CONTROL_MODES.advanced4,
    values: { top: 30, right: 70, bottom: 80, left: 20 }
  },
  {
    name: 'Cloud',
    type: CONTROL_MODES.advanced4,
    values: { top: 55, right: 45, bottom: 70, left: 30 }
  },
];

/**
 * Preset data for 8-Value mode
 */
export const ADVANCED8_PRESETS: Advanced8Preset[] = [
  {
    name: 'Blob 1',
    type: CONTROL_MODES.advanced8,
    values: {
      topLeft: { horizontal: 30, vertical: 70 },
      topRight: { horizontal: 70, vertical: 30 },
      bottomRight: { horizontal: 70, vertical: 70 },
      bottomLeft: { horizontal: 30, vertical: 30 }
    }
  },
  {
    name: 'Blob 2',
    type: CONTROL_MODES.advanced8,
    values: {
      topLeft: { horizontal: 80, vertical: 20 },
      topRight: { horizontal: 30, vertical: 70 },
      bottomRight: { horizontal: 60, vertical: 40 },
      bottomLeft: { horizontal: 20, vertical: 80 }
    }
  },
  {
    name: 'Flower',
    type: CONTROL_MODES.advanced8,
    values: {
      topLeft: { horizontal: 75, vertical: 25 },
      topRight: { horizontal: 25, vertical: 75 },
      bottomRight: { horizontal: 75, vertical: 25 },
      bottomLeft: { horizontal: 25, vertical: 75 }
    }
  },
  {
    name: 'Star-like',
    type: CONTROL_MODES.advanced8,
    values: {
      topLeft: { horizontal: 30, vertical: 70 },
      topRight: { horizontal: 70, vertical: 30 },
      bottomRight: { horizontal: 30, vertical: 70 },
      bottomLeft: { horizontal: 70, vertical: 30 }
    }
  },
  {
    name: 'Abstract',
    type: CONTROL_MODES.advanced8,
    values: {
      topLeft: { horizontal: 85, vertical: 15 },
      topRight: { horizontal: 40, vertical: 60 },
      bottomRight: { horizontal: 15, vertical: 85 },
      bottomLeft: { horizontal: 60, vertical: 40 }
    }
  },
  {
    name: 'Stone',
    type: CONTROL_MODES.advanced8,
    values: {
      topLeft: { horizontal: 65, vertical: 35 },
      topRight: { horizontal: 45, vertical: 55 },
      bottomRight: { horizontal: 55, vertical: 45 },
      bottomLeft: { horizontal: 35, vertical: 65 }
    }
  },
];

export function usePresets() {
  const getPresetsByMode = (mode: ControlMode): Preset[] => {
    switch (mode) {
      case CONTROL_MODES.basic:
        return BASIC_PRESETS;
      case CONTROL_MODES.advanced4:
        return ADVANCED4_PRESETS;
      case CONTROL_MODES.advanced8:
        return ADVANCED8_PRESETS;
      default:
        return [];
    }
  };

  function applyPreset(preset: Preset) {
    const { radiusBasic, radiusAdvanced4, radiusAdvanced8, unit } = useBorderRadius();

    if (preset.type === CONTROL_MODES.basic) {
      radiusBasic.value = preset.values;
      unit.value = preset.unit;
    } else if (preset.type === CONTROL_MODES.advanced4) {
      radiusAdvanced4.value = preset.values;
    } else if (preset.type === CONTROL_MODES.advanced8) {
      radiusAdvanced8.value = preset.values;
    }
  }

  return {
    getPresetsByMode,
    applyPreset
  };
}
