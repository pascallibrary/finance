<template>
  <nav class="bg-dark-bg p-4 shadow-neon">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Finance Tracker</h1>
      <div class="flex gap-4 items-center">
        <router-link v-if="user" to="/dashboard" class="pixel-button">Dashboard</router-link>
        <router-link v-if="user" to="/gamification" class="pixel-button">Gamification</router-link>
        <button v-if="user" @click="$emit('logout')" class="pixel-button">Logout</button>
        <button @click="$emit('toggle-theme')" class="p-2 rounded-full bg-dark-bg">
          <span class="text-2xl">{{ isDarkMode ? '🌞' : '🌙' }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps(['isDarkMode', 'user'])
defineEmits(['toggle-theme', 'logout'])
</script>