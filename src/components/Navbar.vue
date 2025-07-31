<template>
  <nav class="bg-white dark:bg-gray-800 shadow p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Finance Tracker</h1>
      <div class="flex gap-4 items-center">
        <router-link v-if="user" to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link v-if="user" to="/gamification" class="nav-link">Gamification</router-link>
        <button v-if="user" @click="$emit('logout')" class="finance-button">Logout</button>
        <button @click="$emit('toggle-theme')" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm sm:text-base">
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