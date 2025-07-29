<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Login</h2>
    <div class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input v-model="password" type="password" placeholder="Password" class="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <button @click="handleLogin" class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Login</button>
      <p class="text-center text-gray-600 dark:text-gray-300">
        Don't have an account? <router-link to="/signup" class="text-blue-500 hover:underline">Sign Up</router-link>
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
defineEmits(['login'])

const handleLogin = () => {
  if (email.value && password.value) {
    const user = { email: email.value }
    localStorage.setItem('user', JSON.stringify(user))
    emit('login', user)
  } else {
    alert('Please enter email and password')
  }
}
</script>