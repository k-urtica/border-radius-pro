<script setup lang="ts">
const showOutline = defineModel<boolean>('outline');

const emits = defineEmits<{
  randomize: [];
}>();

defineShortcuts({
  r: () => emits('randomize')
});
</script>

<template>
  <div class="flex w-full items-center justify-end gap-5">
    <UTooltip text="Randomize" arrow :kbds="['r']">
      <Motion
        as-child
        :while-press="{ rotate: 180 }"
        :transition="{ duration: 0.6, type: 'spring', bounce: 0.5 }"
      >
        <UButton
          icon="i-lucide-dice-5"
          variant="subtle"
          aria-label="Randomize"
          size="sm"
          class="rounded-full"
          @click="emits('randomize')"
        />
      </Motion>
    </UTooltip>

    <UTooltip :text="showOutline ? 'Hide Outline' : 'Show Outline'" arrow>
      <span>
        <USwitch
          v-model="showOutline"
          label="Outline"
          checked-icon="i-lucide-square-dashed"
          unchecked-icon="i-lucide-minus"
          aria-label="Toggle Outline"
        />
      </span>
    </UTooltip>
  </div>
</template>
