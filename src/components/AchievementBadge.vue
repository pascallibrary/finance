<template>
  <div class="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow flex items-center gap-3 sm:gap-4">
    <span class="text-lg sm:text-2xl">🏆</span>
    <div>
      <h3 class="text-xs sm:text-base font-semibold text-gray-900 dark:text-white">{{ achievement.name }}</h3>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{{ achievement.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['achievement'])
</script>