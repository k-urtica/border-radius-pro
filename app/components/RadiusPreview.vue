<script setup lang="ts">
const props = defineProps<{
  /** border-radius CSS value to apply to the preview element */
  borderRadiusValue: string;
}>();

const showOutline = ref(false);

const previewStyle = computed(() => ({
  borderRadius: props.borderRadiusValue,
}));
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
      aria-label="Preview Element"
      class="relative"
    >
      <div
        class="relative size-48 bg-gradient-to-br from-primary to-error transition-all duration-150 will-change-[border-radius] @xl:size-72 @3xl:size-[420px]"
        :style="previewStyle"
      />

      <div
        v-if="showOutline"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 border-2 border-dashed border-accented"
      />
    </div>
  </div>
</template>
