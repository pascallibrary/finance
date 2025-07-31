<template>
  <div class="max-w-md mx-auto bg-dark-bg p-6 rounded-lg shadow-neon">
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <div class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded-lg bg-gray-800 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue">
      <input v-model="password" type="password" placeholder="Password" class="w-full p-3 border rounded-lg bg-gray-800 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue">
      <button @click="handleLogin" class="w-full pixel-button">Login</button>
      <p class="text-center text-gray-400">
        Don't have an account? <router-link to="/signup" class="text-neon-blue hover:underline">Sign Up</router-link>
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