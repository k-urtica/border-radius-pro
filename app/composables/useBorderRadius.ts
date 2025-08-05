export const CONTROL_MODES = {
  basic: 'basic',
  advanced4: 'advanced4',
  advanced8: 'advanced8'
} as const;

/**
 * Type for control modes.
 */
export type ControlMode = typeof CONTROL_MODES[keyof typeof CONTROL_MODES];

/**
 * Unit types for border-radius values.
 */
export type BorderRadiusUnit = 'px' | '%' | 'em' | 'rem';

/**
 * Four-corner border-radius values.
 */
export interface RadiusBasic {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

/**
 * Border-radius control for each edge.
 * Format: `${top}% ${100-top}% ${100-bottom}% ${bottom}% / ${left}% ${100-right}% ${right}% ${100-left}%`.
 */
export interface RadiusAdvanced4 {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Eight-value border-radius (horizontal and vertical for each corner).
 */
export interface RadiusAdvanced8 {
  topLeft: { horizontal: number; vertical: number };
  topRight: { horizontal: number; vertical: number };
  bottomRight: { horizontal: number; vertical: number };
  bottomLeft: { horizontal: number; vertical: number };
}

/**
 * Composable to manage border-radius values and modes.
 *
 * Provides reactive state for basic, advanced 8-value, and advanced 4-value border-radiuss,
 * along with the current corner mode and unit.
 * Computes the border-radius value and CSS declaration based on the current state.
 */
export function useBorderRadius() {
  const radiusBasic = useState<RadiusBasic>('radius-basic', () => ({
    topLeft: 8,
    topRight: 8,
    bottomRight: 8,
    bottomLeft: 8
  }));

  const radiusAdvanced4 = useState<RadiusAdvanced4>('radius-advanced4', () => ({
    top: 61,
    right: 39,
    bottom: 32,
    left: 68
  }));

  const radiusAdvanced8 = useState<RadiusAdvanced8>('radius-advanced8', () => ({
    topLeft: { horizontal: 30, vertical: 30 },
    topRight: { horizontal: 70, vertical: 30 },
    bottomRight: { horizontal: 70, vertical: 70 },
    bottomLeft: { horizontal: 30, vertical: 70 }
  }));

  const controlMode = useState<ControlMode>('control-mode', () => CONTROL_MODES.basic);
  const unit = useState<BorderRadiusUnit>('radius-unit', () => 'px');

  const getBasicRadiusValue = (radius: RadiusBasic, unit: BorderRadiusUnit): string => {
    const { topLeft, topRight, bottomRight, bottomLeft } = radius;
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return `${topLeft}${unit}`;
    }
    return `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
  };

  const getAdvanced4RadiusValue = (radius: RadiusAdvanced4): string => {
    const { top, right, bottom, left } = radius;
    return `${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${left}% ${right}% ${100 - right}% ${100 - left}%`;
  };

  const getAdvanced8RadiusValue = (radius: RadiusAdvanced8): string => {
    const { topLeft, topRight, bottomRight, bottomLeft } = radius;
    const horizontalValues = [topLeft.horizontal, topRight.horizontal, bottomRight.horizontal, bottomLeft.horizontal];
    const verticalValues = [topLeft.vertical, topRight.vertical, bottomRight.vertical, bottomLeft.vertical];
    const horizontalStr = horizontalValues.map((v) => `${v}%`).join(' ');
    const verticalStr = verticalValues.map((v) => `${v}%`).join(' ');
    return horizontalStr === verticalStr ? horizontalStr : `${horizontalStr} / ${verticalStr}`;
  };

  const borderRadiusValue = computed(() => {
    if (controlMode.value === CONTROL_MODES.basic) {
      return getBasicRadiusValue(radiusBasic.value, unit.value);
    } else if (controlMode.value === CONTROL_MODES.advanced4) {
      return getAdvanced4RadiusValue(radiusAdvanced4.value);
    } else {
      return getAdvanced8RadiusValue(radiusAdvanced8.value);
    }
  });

  const borderRadiusCss = computed(() => `border-radius: ${borderRadiusValue.value};`);

  return {
    radiusBasic,
    radiusAdvanced4,
    radiusAdvanced8,
    controlMode,
    unit,
    borderRadiusValue,
    borderRadiusCss,
    getBasicRadiusValue,
    getAdvanced4RadiusValue,
    getAdvanced8RadiusValue
  };
};
