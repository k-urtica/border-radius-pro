<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    code?: string;
  }>(),
  {
    code: '',
  }
);

const { copy, copied } = useClipboard({ legacy: true });
const toast = useToast();

const handleCopy = async () => {
  await copy(props.code);
  if (copied.value) {
    toast.add({
      title: 'Copied!',
      description: 'The code has been copied to your clipboard.',
      color: 'success',
      duration: 3000,
    });
  }
};
</script>

<template>
  <section>
    <BaseIconText
      v-if="title"
      as="h3"
      icon="i-lucide-code"
      class="mb-1 text-sm font-semibold"
    >
      {{ title }}
    </BaseIconText>
    <div
      role="group"
      :aria-label="`Code block${title ? ` for ${title}` : ''}`"
      class="flex items-center justify-between overflow-hidden rounded-lg border border-muted/60 bg-elevated"
    >
      <pre
        class="max-h-20 w-full overflow-x-auto px-5 py-4 font-mono text-sm whitespace-pre"
        aria-label="Generated code"
      ><code>{{ code }}</code></pre>

      <div class="self-start p-2">
        <UButton
          label="Copy"
          icon="i-lucide-copy"
          variant="solid"
          aria-label="Copy code to clipboard"
          @click="handleCopy()"
        />
      </div>
    </div>
  </section>
</template>
