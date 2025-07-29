<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <Navbar @toggle-theme="toggleTheme" :isDarkMode="isDarkMode" :user="user" @logout="logout" />
    <div class="container mx-auto p-6">
      <router-view :user="user" @login="login" @signup="signup" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

const isDarkMode = ref(localStorage.getItem('theme') === 'dark')
const user = ref(JSON.parse(localStorage.getItem('user')) || null)
const router = useRouter()

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

const login = (userData) => {
  user.value = userData
  localStorage.setItem('user', JSON.stringify(userData))
  router.push('/dashboard')
}

const signup = (userData) => {
  user.value = userData
  localStorage.setItem('user', JSON.stringify(userData))
  router.push('/dashboard')
}

const logout = () => {
  user.value = null
  localStorage.removeItem('user')
  router.push('/login')
}
</script>