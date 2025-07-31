<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
    <h2 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Login</h2>
    <div class="space-y-3 sm:space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 sm:p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base">
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 sm:p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base">
      <button @click="handleLogin" class="w-full finance-button">Login</button>
      <p class="text-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
        Don't have an account? <router-link to="/signup" class="text-blue-600 dark:text-blue-400 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  if (email.value && password.value) {
    const user = { email: email.value }
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/dashboard')
  } else {
    alert('Please enter email and password')
  }
}
</script>