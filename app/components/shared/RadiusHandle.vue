<script setup lang="ts">
export interface RadiusHandleProps {
  /** current value of the handle */
  value: number;
  /** CSS styles to apply to the handle */
  style: Record<string, string>;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Tooltip text for the handle */
  tooltip?: string;
  /** Indicates if the handle is currently being dragged */
  dragging?: boolean;
}

defineProps<RadiusHandleProps>();

defineEmits<{
  mousedown: [event: MouseEvent | TouchEvent];
  touchstart: [event: MouseEvent | TouchEvent];
  keydown: [event: KeyboardEvent];
}>();
</script>

<template>
  <UTooltip
    :text="tooltip"
    :disabled="!tooltip || dragging"
    arrow
    :ui="{ text: 'capitalize' }"
  >
    <div
      :class="cn('absolute size-8 cursor-grab rounded-full transition-colors duration-200 hover:bg-inverted/5', {
        'cursor-grabbing bg-inverted/5 ring-1 ring-inverted/20': dragging
      })"
      :style="style"
      :aria-label="ariaLabel"
      role="slider"
      tabindex="0"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="100"
      @mousedown="$emit('mousedown', $event)"
      @touchstart="$emit('touchstart', $event)"
      @keydown="$emit('keydown', $event)"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 m-auto size-3.5 rounded-full bg-white/50 ring-1 ring-black/70"
      />
    </div>
  </UTooltip>
</template>
