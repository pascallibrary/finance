<template>
  <div class="container mx-auto p-4 sm:p-6">
    <h2 class="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Gamification</h2>
    
    <!-- Achievements -->
    <div class="mb-8">
      <h3 class="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Achievements</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AchievementBadge v-for="achievement in achievements" :key="achievement.id" :achievement="achievement" />
      </div>
      <p v-if="achievements.length === 0" class="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-4">
        No achievements unlocked yet! Play games or add transactions to earn badges.
      </p>
    </div>

    <!-- Budget Balancing Quiz -->
    <div class="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 class="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Budget Balancing Quiz</h3>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">Answer this question to balance a budget and earn points!</p>
      <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 mb-2">{{ quizQuestion.question }}</p>
      <div class="flex flex-col sm:flex-row gap-2">
        <button v-for="option in quizQuestion.options" :key="option" @click="answerQuiz(option)" class="finance-button text-sm sm:text-base">{{ option }}</button>
      </div>
      <p v-if="quizFeedback" class="mt-4 text-xs sm:text-sm" :class="{ 'text-green-500': quizFeedback.isCorrect, 'text-red-500': !quizFeedback.isCorrect }">
        {{ quizFeedback.message }}
      </p>
    </div>

    <!-- Savings Goal Challenge -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 class="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Savings Goal Challenge</h3>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">Set a savings goal and track progress!</p>
      <div class="flex flex-col sm:flex-row gap-4 mb-4">
        <input v-model.number="savingsGoal" type="number" placeholder="Savings Goal ($)" class="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
        <button @click="setSavingsGoal" class="finance-button text-sm sm:text-base">Set Goal</button>
      </div>
      <p v-if="savingsProgress" class="text-xs sm:text-sm text-gray-700 dark:text-gray-200">
        Progress: ${{ balance }} / ${{ savingsGoal }} ({{ (balance / savingsGoal * 100).toFixed(1) }}%)
      </p>
      <p v-if="savingsFeedback" class="mt-2 text-xs sm:text-sm text-green-500">{{ savingsFeedback }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AchievementBadge from '../components/AchievementBadge.vue'

const transactions = JSON.parse(localStorage.getItem('transactions')) || []
const balance = transactions.reduce((acc, t) => t.type === 'Income' ? acc + t.amount : acc - t.amount, 0)
const savingsGoal = ref(JSON.parse(localStorage.getItem('savingsGoal')) || 0)
const savingsProgress = ref(savingsGoal.value > 0)
const savingsFeedback = ref('')
const quizQuestion = ref({
  question: 'If you spend $50 on groceries and earn $200, what’s your new balance?',
  options: ['$150', '$100', '$250', '$-50'],
  correct: '$150',
})
const quizFeedback = ref(null)

const achievements = computed(() => {
  const badges = []
  if (transactions.length >= 1) badges.push({ id: 1, name: 'First Transaction', description: 'Added your first transaction!' })
  if (transactions.length >= 5) badges.push({ id: 2, name: 'Frequent Tracker', description: 'Added 5 transactions!' })
  if (balance >= 1000) badges.push({ id: 3, name: 'Big Saver', description: 'Reached a balance of $1000!' })
  if (transactions.filter(t => t.type === 'Expense').length >= 3) badges.push({ id: 4, name: 'Spender', description: 'Made 3 expense transactions!' })
  if (quizFeedback.value?.isCorrect) badges.push({ id: 5, name: 'Quiz Master', description: 'Answered the budget quiz correctly!' })
  if (savingsGoal.value > 0 && balance >= savingsGoal.value) badges.push({ id: 6, name: 'Goal Achiever', description: 'Met your savings goal!' })
  return badges
})

const answerQuiz = (option) => {
  quizFeedback.value = {
    isCorrect: option === quizQuestion.value.correct,
    message: option === quizQuestion.value.correct ? 'Correct! You balanced the budget!' : 'Incorrect. Try again!'
  }
}

const setSavingsGoal = () => {
  if (savingsGoal.value > 0) {
    localStorage.setItem('savingsGoal', JSON.stringify(savingsGoal.value))
    savingsProgress.value = true
    if (balance >= savingsGoal.value) {
      savingsFeedback.value = 'Congratulations! You’ve met your savings goal!'
    }
  }
}
</script>