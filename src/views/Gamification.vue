<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center">🏆 Gamification Hub</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <AchievementBadge v-for="achievement in achievements" :key="achievement.id" :achievement="achievement" />
    </div>
    <p v-if="achievements.length === 0" class="text-center text-gray-400 mt-6">
      No achievements unlocked yet! Keep tracking to earn badges.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AchievementBadge from '../components/AchievementBadge.vue'

const transactions = JSON.parse(localStorage.getItem('transactions')) || []
const balance = transactions.reduce((acc, t) => {
  return t.type === 'Income' ? acc + t.amount : acc - t.amount
}, 0)

const achievements = computed(() => {
  const badges = []
  if (transactions.length >= 1) badges.push({ id: 1, name: 'First Transaction', description: 'Added your first transaction!' })
  if (transactions.length >= 5) badges.push({ id: 2, name: 'Frequent Tracker', description: 'Added 5 transactions!' })
  if (balance >= 1000) badges.push({ id: 3, name: 'Big Saver', description: 'Reached a balance of $1000!' })
  if (transactions.filter(t => t.type === 'Expense').length >= 3) badges.push({ id: 4, name: 'Spender', description: 'Made 3 expense transactions!' })
  return badges
})
</script>