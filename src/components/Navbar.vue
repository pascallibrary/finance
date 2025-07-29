<template>
  <nav class="bg-white dark:bg-gray-800 shadow p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">Finance Tracker</h1>
      <div class="flex gap-4 items-center">
        <span v-if="user" class="text-gray-600 dark:text-gray-300">Welcome, {{ user.email }}</span>
        <button v-if="user" @click="$emit('logout')" class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">Logout</button>
        <button @click="$emit('toggle-theme')" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <span>{{ isDarkMode ? '🌞' : '🌙' }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps(['isDarkMode', 'user'])
defineEmits(['toggle-theme', 'logout'])
</script>