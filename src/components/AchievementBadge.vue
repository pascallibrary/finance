<template>
  <div class="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow flex items-center gap-4">
    <span class="text-2xl">🏆</span>
    <div>
      <h3 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200">{{ achievement.name }}</h3>
      <p class="text-sm text-yellow-600 dark:text-yellow-400">{{ achievement.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['achievement'])
</script>