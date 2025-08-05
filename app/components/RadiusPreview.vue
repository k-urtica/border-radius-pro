<script setup lang="ts">
const props = defineProps<{
  /** border-radius CSS value to apply to the preview element */
  borderRadiusValue: string;
}>();

const { controlMode, radiusAdvanced4, radiusAdvanced8 } = useBorderRadius();

const showOutline = ref(false);
const previewElementRef = useTemplateRef('previewElementRef');

const shouldShowHandles = computed(() =>
  controlMode.value === CONTROL_MODES.advanced4 || controlMode.value === CONTROL_MODES.advanced8
);

const previewStyle = computed(() => ({
  borderRadius: props.borderRadiusValue,
}));

const { draggingKey, handles, startDrag, onKeyDown } = useDragHandles4(radiusAdvanced4, previewElementRef);
const {
  draggingKey: draggingKey8,
  handles: handles8,
  startDrag: startDrag8,
  onKeyDown: onKeyDown8
} = useDragHandles8(radiusAdvanced8, previewElementRef);
</script>

<template>
  <div
    role="region"
    aria-label="Border radius preview area"
    class="@container relative flex size-full min-h-0 items-center justify-center overflow-auto rounded-lg bg-elevated p-8"
  >
    <div class="absolute top-3 right-3">
      <UTooltip :text="showOutline ? 'Hide Outline' : 'Show Outline'">
        <span>
          <USwitch
            v-model="showOutline"
            checked-icon="i-lucide-square-dashed"
            unchecked-icon="i-lucide-minus"
            size="lg"
            aria-label="Toggle Outline"
          />
        </span>
      </UTooltip>
    </div>

    <div
      ref="previewElementRef"
      aria-label="Preview Element"
      class="relative"
    >
      <div
        class="relative size-48 bg-gradient-to-br from-primary to-error transition-all duration-100 ease-out will-change-[border-radius] @xl:size-72 @3xl:size-[420px]"
        :style="previewStyle"
      />

      <div
        v-if="showOutline"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 border-2 border-dashed border-accented"
      />

      <template v-if="shouldShowHandles">
        <template v-if="controlMode === CONTROL_MODES.advanced4">
          <UTooltip
            v-for="handle in handles"
            :key="handle.key"
            :text="handle.key"
            arrow
            :ui="{ text: 'capitalize' }"
          >
            <div
              :class="cn('absolute size-8 cursor-grab rounded-full transition-colors duration-200 hover:bg-inverted/5', {
                'cursor-grabbing bg-inverted/5 ring-1 ring-inverted/20': draggingKey === handle.key
              })"
              :style="handle.style"
              :aria-label="handle.ariaLabel"
              role="slider"
              tabindex="0"
              :aria-valuenow="handle.value"
              :aria-valuemin="0"
              :aria-valuemax="100"
              @mousedown="startDrag(handle.key, $event)"
              @touchstart="startDrag(handle.key, $event)"
              @keydown="onKeyDown(handle.key, $event)"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 m-auto size-4 rounded-full bg-white/50 ring-1 ring-black/70"
              />
            </div>
          </UTooltip>
        </template>

        <template v-else-if="controlMode === CONTROL_MODES.advanced8">
          <UTooltip
            v-for="handle in handles8"
            :key="handle.key"
            :text="handle.key"
            arrow
            :ui="{ text: 'capitalize' }"
          >
            <div
              :class="cn('absolute size-8 cursor-grab rounded-full transition-colors duration-200 hover:bg-inverted/5', {
                'cursor-grabbing bg-inverted/5 ring-1 ring-inverted/20': draggingKey8 === handle.key
              })"
              :style="handle.style"
              :aria-label="handle.ariaLabel"
              role="slider"
              tabindex="0"
              :aria-valuenow="handle.value"
              :aria-valuemin="0"
              :aria-valuemax="100"
              @mousedown="startDrag8(handle.key, $event)"
              @touchstart="startDrag8(handle.key, $event)"
              @keydown="onKeyDown8(handle.key, $event)"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 m-auto size-4 rounded-full bg-white/50 ring-1 ring-black/70"
              />
            </div>
          </UTooltip>
        </template>
      </template>
    </div>
  </div>
</template>
