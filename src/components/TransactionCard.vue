<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
    <div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ transaction.description }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ transaction.type }}: ${{ transaction.amount.toFixed(2) }}</p>
    </div>
    <button @click="$emit('delete')" class="text-red-500 hover:text-red-700 dark:text-red-400">Delete</button>
  </div>
</template>

<script setup>
defineProps(['transaction'])
defineEmits(['delete'])
</script>