<script setup lang="ts">

</script>

<template>
  <UApp :tooltip="{ delayDuration: 100, skipDelayDuration: 150 }">
    <div class="flex h-dvh flex-col overflow-y-clip bg-base-0">
      <AppHeader class="shrink-0" />

      <main class="flex-1">
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>
