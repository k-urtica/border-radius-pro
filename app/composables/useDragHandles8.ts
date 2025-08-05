import type { Ref } from 'vue';
import type { RadiusAdvanced8 } from '@/composables/useBorderRadius';

type RadiusCorner = keyof RadiusAdvanced8;
type RadiusDirection = 'horizontal' | 'vertical';

interface ComputedHandle8 {
  key: string;
  corner: RadiusCorner;
  direction: RadiusDirection;
  value: number;
  style: Record<string, string>;
  ariaLabel: string;
}

interface HandleBounds {
  left: number;
  top: number;
  width: number;
  height: number;
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

export function useDragHandles8(
  radiusState: Ref<RadiusAdvanced8>,
  previewElementRef: Ref<HTMLElement | null>
) {
  const draggingKey = ref<string>();
  const { width, height, left, top } = useElementBounding(previewElementRef);
  let stopFns: Array<() => void> = [];

  const handles = computed<ComputedHandle8[]>(() =>
    HANDLE_DEFINITIONS_8.map(({ corner, direction, positionCalculator, ariaLabel }) => {
      const value = radiusState.value[corner][direction];
      const position = positionCalculator(value);
      const key = `${corner}-${direction}`;

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

  const bounds = computed<HandleBounds>(() => ({
    left: left.value,
    top: top.value,
    width: width.value,
    height: height.value
  }));

  function startDrag(key: string, event: MouseEvent | TouchEvent) {
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

    if (!bounds.value.width || !bounds.value.height) return;

    const handle = handles.value.find((h) => h.key === currentKey);
    if (!handle) return;

    const { corner, direction } = handle;
    const relativeCoord = getRelativeCoord(event, bounds.value);

    let newValue: number;

    if (direction === 'horizontal') {
      // For horizontal handles, use X coordinate
      if (corner === 'topLeft' || corner === 'bottomLeft') {
        newValue = (relativeCoord.x / bounds.value.width) * 100;
      } else {
        // topRight, bottomRight
        newValue = ((bounds.value.width - relativeCoord.x) / bounds.value.width) * 100;
      }
    } else {
      // For vertical handles, use Y coordinate
      if (corner === 'topLeft' || corner === 'topRight') {
        newValue = (relativeCoord.y / bounds.value.height) * 100;
      } else {
        // bottomLeft, bottomRight
        newValue = ((bounds.value.height - relativeCoord.y) / bounds.value.height) * 100;
      }
    }

    newValue = Math.max(0, Math.min(100, newValue));
    radiusState.value[corner][direction] = Math.round(newValue);
  }

  function getRelativeCoord(event: MouseEvent | TouchEvent, bounds: HandleBounds): { x: number; y: number } {
    let clientX: number;
    let clientY: number;

    if ('touches' in event && event.touches.length > 0) {
      const touch = event.touches[0];
      if (touch) {
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        return { x: 0, y: 0 };
      }
    } else if ('clientX' in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return { x: 0, y: 0 };
    }

    return {
      x: clientX - bounds.left,
      y: clientY - bounds.top
    };
  }

  function stopDrag() {
    draggingKey.value = undefined;
    stopFns.forEach((fn) => fn());
    stopFns = [];
  }

  function onKeyDown(handleKey: string, event: KeyboardEvent) {
    const handle = handles.value.find((h) => h.key === handleKey);
    if (!handle) return;

    const { corner, direction } = handle;
    const currentValue = radiusState.value[corner][direction];

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      radiusState.value[corner][direction] = Math.min(100, currentValue + 1);
      event.preventDefault();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      radiusState.value[corner][direction] = Math.max(0, currentValue - 1);
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
