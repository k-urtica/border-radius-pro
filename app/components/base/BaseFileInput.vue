<script setup lang="ts">
withDefaults(defineProps<{
  label?: string;
  accept?: string;
  clearTooltip?: string;
}>(), {
  clearTooltip: 'Clear'
});

const emits = defineEmits<{
  change: [files: File | undefined];
  clear: [];
}>();

const inputEl = useTemplateRef('inputRef');

const handleChangeFile = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  emits('change', file);
};

const handleClearFile = () => {
  if (!inputEl.value?.inputRef) return;
  inputEl.value.inputRef.value = '';
  emits('clear');
};
</script>

<template>
  <UFormField :label="label">
    <UInput
      ref="inputRef"
      type="file"
      :accept="accept"
      variant="soft"
      :ui="{ base: 'ring-1 ring-muted/80' }"
      @change="handleChangeFile"
    >
      <template #trailing>
        <UTooltip :text="clearTooltip" arrow>
          <UButton
            variant="link"
            size="sm"
            icon="i-lucide-trash"
            :aria-label="clearTooltip"
            @click="handleClearFile"
          />
        </UTooltip>
      </template>
    </UInput>
  </UFormField>
</template>
