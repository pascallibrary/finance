<template>
  <div class="bg-dark-bg p-4 rounded-lg shadow-neon flex justify-between items-center transform hover:scale-105 transition-transform">
    <div>
      <h3 class="text-lg font-semibold">{{ transaction.description }}</h3>
      <p class="text-sm text-neon-green">{{ transaction.type }}: ${{ transaction.amount.toFixed(2) }}</p>
    </div>
    <button @click="$emit('delete')" class="text-red-500 hover:text-red-700">Delete</button>
  </div>
</template>

<script setup>
defineProps(['transaction'])
defineEmits(['delete'])
</script>