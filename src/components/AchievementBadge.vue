<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4">
    <span class="text-xl sm:text-2xl">🏆</span>
    <div>
      <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{{ achievement.name }}</h3>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{{ achievement.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['achievement'])
</script>