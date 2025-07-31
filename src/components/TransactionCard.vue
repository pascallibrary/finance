<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
    <div>
      <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{{ transaction.description }}</h3>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{{ transaction.type }}: ${{ transaction.amount.toFixed(2) }}</p>
    </div>
    <button @click="$emit('delete')" class="text-red-500 hover:text-red-700 text-xs sm:text-sm">Delete</button>
  </div>
</template>

<script setup>
defineProps(['transaction'])
defineEmits(['delete'])
</script>