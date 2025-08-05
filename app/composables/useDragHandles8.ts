import type { Ref } from 'vue';
import type { RadiusAdvanced8 } from '@/composables/useBorderRadius';

type RadiusCorner = keyof RadiusAdvanced8;
type RadiusDirection = 'horizontal' | 'vertical';
export type HandleKey8 = `${RadiusCorner}-${RadiusDirection}`;

export interface ComputedHandle8 {
  key: HandleKey8;
  corner: RadiusCorner;
  direction: RadiusDirection;
  value: number;
  style: Record<string, string>;
  ariaLabel: string;
}

interface HandleDefinition8 {
  corner: RadiusCorner;
  direction: RadiusDirection;
  positionCalculator: (value: number) => { x: number; y: number };
  ariaLabel: string;
}

const HANDLE_DEFINITIONS_8 = [
  // Top Left Corner
  {
    corner: 'topLeft',
    direction: 'horizontal',
    positionCalculator: (value: number) => ({ x: value, y: 0 }),
    ariaLabel: 'Adjust top left horizontal radius'
  },
  {
    corner: 'topLeft',
    direction: 'vertical',
    positionCalculator: (value: number) => ({ x: 0, y: value }),
    ariaLabel: 'Adjust top left vertical radius'
  },
  // Top Right Corner
  {
    corner: 'topRight',
    direction: 'horizontal',
    positionCalculator: (value: number) => ({ x: 100 - value, y: 0 }),
    ariaLabel: 'Adjust top right horizontal radius'
  },
  {
    corner: 'topRight',
    direction: 'vertical',
    positionCalculator: (value: number) => ({ x: 100, y: value }),
    ariaLabel: 'Adjust top right vertical radius'
  },
  // Bottom Right Corner
  {
    corner: 'bottomRight',
    direction: 'horizontal',
    positionCalculator: (value: number) => ({ x: 100 - value, y: 100 }),
    ariaLabel: 'Adjust bottom right horizontal radius'
  },
  {
    corner: 'bottomRight',
    direction: 'vertical',
    positionCalculator: (value: number) => ({ x: 100, y: 100 - value }),
    ariaLabel: 'Adjust bottom right vertical radius'
  },
  // Bottom Left Corner
  {
    corner: 'bottomLeft',
    direction: 'horizontal',
    positionCalculator: (value: number) => ({ x: value, y: 100 }),
    ariaLabel: 'Adjust bottom left horizontal radius'
  },
  {
    corner: 'bottomLeft',
    direction: 'vertical',
    positionCalculator: (value: number) => ({ x: 0, y: 100 - value }),
    ariaLabel: 'Adjust bottom left vertical radius'
  }
] as const satisfies HandleDefinition8[];

/**
 * Composable to manage drag handles for 8-value border-radius control.
 */
export function useDragHandles8(
  radiusState: Ref<RadiusAdvanced8>,
  previewElementRef: Ref<HTMLElement | null>
) {
  const draggingKey = ref<HandleKey8>();
  let stopFns: Array<() => void> = [];

  const handles = computed<ComputedHandle8[]>(() =>
    HANDLE_DEFINITIONS_8.map(({ corner, direction, positionCalculator, ariaLabel }) => {
      const value = radiusState.value[corner][direction];
      const position = positionCalculator(value);
      const key: HandleKey8 = `${corner}-${direction}`;

      return {
        key,
        corner,
        direction,
        value,
        style: {
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        },
        ariaLabel
      };
    })
  );

  function startDrag(key: HandleKey8, event: MouseEvent | TouchEvent) {
    draggingKey.value = key;
    event.preventDefault();
    stopFns = [
      useEventListener(window, 'mousemove', onDrag),
      useEventListener(window, 'mouseup', stopDrag),
      useEventListener(window, 'touchmove', onDrag, { passive: false }),
      useEventListener(window, 'touchend', stopDrag)
    ];
  }

  function onDrag(event: MouseEvent | TouchEvent) {
    const currentKey = draggingKey.value;
    if (!currentKey) return;
    event.preventDefault();

    const handle = handles.value.find((h) => h.key === currentKey);
    if (!handle) return;
    const { corner, direction } = handle;
    const el = previewElementRef.value;
    if (!el) return;

    const { x, y } = getPointerPosition(event, el);

    let newValue: number;
    if (direction === 'horizontal') {
      if (corner === 'topLeft' || corner === 'bottomLeft') {
        newValue = x * 100;
      } else {
        newValue = (1 - x) * 100;
      }
    } else {
      if (corner === 'topLeft' || corner === 'topRight') {
        newValue = y * 100;
      } else {
        newValue = (1 - y) * 100;
      }
    }
    newValue = clampPercent(newValue);
    radiusState.value[corner][direction] = Math.round(newValue);
  }

  function stopDrag() {
    draggingKey.value = undefined;
    stopFns.forEach((fn) => fn());
    stopFns = [];
  }

  function onKeyDown(handleKey: HandleKey8, event: KeyboardEvent) {
    const handle = handles.value.find((h) => h.key === handleKey);
    if (!handle) return;
    const { corner, direction } = handle;
    const currentValue = radiusState.value[corner][direction];
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      radiusState.value[corner][direction] = clampPercent(currentValue + 1);
      event.preventDefault();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      radiusState.value[corner][direction] = clampPercent(currentValue - 1);
      event.preventDefault();
    }
  }

  return {
    handles: readonly(handles),
    draggingKey: readonly(draggingKey),
    startDrag,
    onKeyDown
  };
}
