<template>
  <nav class="bg-white dark:bg-gray-800 shadow p-2 sm:p-4 relative" ref="navRef">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">Finance Tracker</h1>
      <button class="hamburger" @click="toggleMenu">
        <span>{{ isMenuOpen ? '✖' : '☰' }}</span>
      </button>
      <div :class="{ 'hidden sm:flex': !isMenuOpen }" class="nav-menu">
        <router-link v-if="user" to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link v-if="user" to="/gamification" class="nav-link">Gamification</router-link>
        <button v-if="user" @click="$emit('logout')" class="finance-button">Logout</button>
        <button @click="$emit('toggle-theme')" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-xs sm:text-base min-h-10 w-full sm:w-auto flex justify-center items-center">
          <span>{{ isDarkMode ? '🌞' : '🌙' }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps(['isDarkMode', 'user'])
defineEmits(['toggle-theme', 'logout'])

const isMenuOpen = ref(false)
const navRef = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenuOnOutsideClick = (event) => {
  if (isMenuOpen.value && navRef.value && !navRef.value.contains(event.target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenuOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnOutsideClick)
})
</script>