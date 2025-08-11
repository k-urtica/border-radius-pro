<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { HTMLAttributes } from 'vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    code?: string;
    preClass?: HTMLAttributes['class'];
  }>(),
  {
    code: '',
  }
);

const { copy, copied } = useClipboard({ legacy: true });

const buttonProps = computed<ButtonProps>(() => {
  return copied.value
    ? {
        label: 'Copied!',
        icon: 'i-lucide-check',
        color: 'success',
        variant: 'subtle',
      }
    : {
        label: 'Copy',
        icon: 'i-lucide-copy',
        color: 'neutral',
        variant: 'outline',
      };
});
</script>

<template>
  <section>
    <div class="mb-1 flex items-center">
      <BaseIconText
        v-if="title"
        as="h3"
        icon="i-lucide-code"
        class="text-sm font-semibold"
      >
        {{ title }}
      </BaseIconText>

      <UButton
        v-bind="buttonProps"
        size="xs"
        aria-label="Copy code to clipboard"
        class="ms-auto"
        @click="copy(props.code)"
      />
    </div>
    <div
      role="group"
      :aria-label="`Code block${title ? ` for ${title}` : ''}`"
      class="rounded-lg border border-muted/60 bg-elevated"
    >
      <pre
        :class="cn('size-full overflow-auto p-4 font-mono text-sm whitespace-pre', preClass)"
        aria-label="Generated code"
      ><code>{{ code }}</code></pre>
    </div>
  </section>
</template>
