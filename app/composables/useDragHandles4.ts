import type { Ref } from 'vue';
import type { RadiusAdvanced4 } from '@/composables/useBorderRadius';

type HandleKey = keyof RadiusAdvanced4;

export interface ComputedHandle4 {
  key: HandleKey;
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
  key: HandleKey;
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
  const draggingKey = ref<HandleKey>();
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

  function startDrag(key: HandleKey, event: MouseEvent | TouchEvent) {
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

    const el = previewElementRef.value;
    if (!el) return;

    const { x, y } = getPointerPosition(event, el);

    let newValue: number;
    if (currentKey === 'top' || currentKey === 'bottom') {
      newValue = x * 100;
    } else {
      newValue = y * 100;
    }
    newValue = clampPercent(newValue);
    radiusState.value[currentKey] = Math.round(newValue);
  }

  function stopDrag() {
    draggingKey.value = undefined;
    stopFns.forEach((fn) => fn());
    stopFns = [];
  }

  function onKeyDown(handleKey: HandleKey, event: KeyboardEvent) {
    const currentValue = radiusState.value[handleKey];
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      radiusState.value[handleKey] = clampPercent(currentValue + 1);
      event.preventDefault();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      radiusState.value[handleKey] = clampPercent(currentValue - 1);
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
