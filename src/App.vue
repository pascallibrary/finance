<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors">
    <Navbar :isDarkMode="isDarkMode" :user="user" @toggle-theme="toggleTheme" @logout="logout" />
    <div class="container mx-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

const isDarkMode = ref(localStorage.getItem('theme') === 'dark')
const user = ref(JSON.parse(localStorage.getItem('user')) || null)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark')
}

const logout = () => {
  user.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('transactions')
}
</script>