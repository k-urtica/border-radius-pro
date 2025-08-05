import type { Ref } from 'vue';
import type { RadiusAdvanced4 } from '@/composables/useBorderRadius';

type RadiusKey = keyof RadiusAdvanced4;

interface ComputedHandle4 {
  key: RadiusKey;
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

interface HandleDefinition4 {
  key: RadiusKey;
  positionKey: 'top' | 'left';
  offset: Partial<Record<'top' | 'right' | 'bottom' | 'left' | 'transform', string>>;
  ariaLabel: string;
}

const HANDLE_DEFINITIONS = [
  {
    key: 'top',
    positionKey: 'left',
    offset: { top: '-1rem', transform: 'translateX(-50%)' },
    ariaLabel: 'Adjust top edge radius value'
  },
  {
    key: 'right',
    positionKey: 'top',
    offset: { right: '-1rem', transform: 'translateY(-50%)' },
    ariaLabel: 'Adjust right edge radius value'
  },
  {
    key: 'bottom',
    positionKey: 'left',
    offset: { bottom: '-1rem', transform: 'translateX(-50%)' },
    ariaLabel: 'Adjust bottom edge radius value'
  },
  {
    key: 'left',
    positionKey: 'top',
    offset: { left: '-1rem', transform: 'translateY(-50%)' },
    ariaLabel: 'Adjust left edge radius value'
  }
] as const satisfies HandleDefinition4[];

export function useDragHandles4(
  radiusState: Ref<RadiusAdvanced4>,
  previewElementRef: Ref<HTMLElement | null>
) {
  const draggingKey = ref<RadiusKey>();
  const { width, height, left, top } = useElementBounding(previewElementRef);
  let stopFns: Array<() => void> = [];

  const handles = computed<ComputedHandle4[]>(() =>
    HANDLE_DEFINITIONS.map(({ key, positionKey, offset, ariaLabel }) => {
      const value = radiusState.value[key];

      return {
        key,
        value,
        style: {
          ...offset,
          [positionKey]: `${value}%`
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

  function startDrag(key: RadiusKey, event: MouseEvent | TouchEvent) {
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

    const currentCoord = getRelativeCoord(currentKey, event, bounds.value);
    let newValue: number;

    if (currentKey === 'top' || currentKey === 'bottom') {
      newValue = (currentCoord / bounds.value.width) * 100;
    } else {
      newValue = (currentCoord / bounds.value.height) * 100;
    }

    newValue = Math.max(0, Math.min(100, newValue));

    radiusState.value[currentKey] = Math.round(newValue);
  }

  function getRelativeCoord(handleKey: RadiusKey, event: MouseEvent | TouchEvent, bounds: HandleBounds): number {
    let clientX: number;
    let clientY: number;

    if ('touches' in event && event.touches.length > 0) {
      const touch = event.touches[0];
      if (touch) {
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        return 0;
      }
    } else if ('clientX' in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return 0;
    }

    if (handleKey === 'top' || handleKey === 'bottom') {
      return clientX - bounds.left;
    } else {
      return clientY - bounds.top;
    }
  }

  function stopDrag() {
    draggingKey.value = undefined;
    stopFns.forEach((fn) => fn());
    stopFns = [];
  }

  function onKeyDown(handleKey: RadiusKey, event: KeyboardEvent) {
    const currentValue = radiusState.value[handleKey];

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      radiusState.value[handleKey] = Math.min(100, currentValue + 1);
      event.preventDefault();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      radiusState.value[handleKey] = Math.max(0, currentValue - 1);
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
