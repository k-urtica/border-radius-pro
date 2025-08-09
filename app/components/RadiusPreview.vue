<script setup lang="ts">
import type { StyleValue } from 'vue';
import type { HandleKey4 } from '@/composables/useDragHandles4';
import type { HandleKey8 } from '@/composables/useDragHandles8';

interface HandlesManager {
  handles: ReadonlyArray<ComputedHandle4> | ReadonlyArray<ComputedHandle8>;
  draggingKey: HandleKey4 | HandleKey8 | undefined;
  onStartDrag: (handle: { key: HandleKey4 | HandleKey8 }, event: MouseEvent | TouchEvent) => void;
  onKeyDown: (handle: { key: HandleKey4 | HandleKey8 }, event: KeyboardEvent) => void;
}

const { previewSize, previewBgUrl } = useAppearance();
const { borderRadiusValue, controlMode, radiusAdvanced4, radiusAdvanced8, randomize } = useBorderRadius();

const showOutline = ref(false);
const previewElementRef = useTemplateRef('previewElementRef');

const shouldShowHandles = computed(() =>
  controlMode.value === CONTROL_MODES.advanced4 || controlMode.value === CONTROL_MODES.advanced8
);

const previewStyle = computed<StyleValue>(() => ({
  borderRadius: borderRadiusValue.value,
  width: `${previewSize.value.width}px`,
  height: `${previewSize.value.height}px`,
  backgroundImage: previewBgUrl.value ? `url(${previewBgUrl.value})` : undefined,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));

const {
  draggingKey: draggingKey4,
  handles: handles4,
  startDrag: startDrag4,
  onKeyDown: onKeyDown4
} = useDragHandles4(radiusAdvanced4, previewElementRef);
const {
  draggingKey: draggingKey8,
  handles: handles8,
  startDrag: startDrag8,
  onKeyDown: onKeyDown8
} = useDragHandles8(radiusAdvanced8, previewElementRef);

const isMode4 = computed(() => controlMode.value === CONTROL_MODES.advanced4);

const handlesManager = computed<HandlesManager>(() => {
  const currentHandles = isMode4.value ? handles4.value : handles8.value;
  const currentDraggingKey = isMode4.value ? draggingKey4.value : draggingKey8.value;
  return {
    handles: currentHandles,
    draggingKey: currentDraggingKey,
    onStartDrag: ({ key }, event) => isMode4.value ? startDrag4(key as HandleKey4, event) : startDrag8(key as HandleKey8, event),
    onKeyDown: ({ key }, event) => isMode4.value ? onKeyDown4(key as HandleKey4, event) : onKeyDown8(key as HandleKey8, event)
  };
});
</script>

<template>
  <section
    aria-label="Border radius preview area"
    class="@container relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg bg-elevated"
  >
    <div class="flex size-full min-h-0 flex-col items-center justify-center p-3">
      <div
        ref="previewElementRef"
        class="relative max-h-full max-w-full"
      >
        <div
          class="relative max-h-full max-w-full bg-gradient-to-br from-primary to-error transition-all duration-100 ease-out will-change-[border-radius]"
          :style="previewStyle"
        />

        <div
          v-if="showOutline"
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 border-2 border-dashed border-accented"
        />

        <template v-if="shouldShowHandles">
          <RadiusHandle
            v-for="handle in handlesManager.handles"
            :key="handle.key"
            :value="handle.value"
            :style="handle.style"
            :aria-label="handle.ariaLabel"
            :tooltip="handle.key"
            :dragging="handlesManager.draggingKey === handle.key"
            @mousedown="handlesManager.onStartDrag(handle, $event)"
            @touchstart="handlesManager.onStartDrag(handle, $event)"
            @keydown="handlesManager.onKeyDown(handle, $event)"
          />
        </template>
      </div>
    </div>

    <RadiusPreviewFooter
      v-model:outline="showOutline"
      class="px-4 pb-2"
      @randomize="randomize"
    />
  </section>
</template>
