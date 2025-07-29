<template>
  <div>
    <!-- Balance Display -->
    <div class="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Current Balance</h2>
      <p class="text-3xl font-bold" :class="{ 'text-green-500': balance >= 0, 'text-red-500': balance < 0 }">${{ balance.toFixed(2) }}</p>
    </div>

    <!-- Achievements -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Achievements</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AchievementBadge v-for="achievement in achievements" :key="achievement.id" :achievement="achievement" />
      </div>
    </div>

    <!-- Transaction Input -->
    <div class="mb-6 flex gap-4 flex-col sm:flex-row">
      <input v-model="newTransaction.description" type="text" placeholder="Description (e.g., Salary, Coffee)" class="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input v-model.number="newTransaction.amount" type="number" placeholder="Amount" class="w-full sm:w-32 p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <select v-model="newTransaction.type" class="p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none">
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <button @click="addTransaction" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
    </div>

    <!-- Filter Buttons -->
    <div class="mb-6 flex gap-4 justify-center">
      <button @click="filter = 'All'" :class="{ 'bg-blue-500 text-white': filter === 'All', 'bg-gray-200 dark:bg-gray-700': filter !== 'All' }" class="px-4 py-2 rounded-lg">All</button>
      <button @click="filter = 'Income'" :class="{ 'bg-blue-500 text-white': filter === 'Income', 'bg-gray-200 dark:bg-gray-700': filter !== 'Income' }" class="px-4 py-2 rounded-lg">Income</button>
      <button @click="filter = 'Expense'" :class="{ 'bg-blue-500 text-white': filter === 'Expense', 'bg-gray-200 dark:bg-gray-700': filter !== 'Expense' }" class="px-4 py-2 rounded-lg">Expense</button>
    </div>

    <!-- Transaction List -->
    <div class="grid gap-4">
      <TransactionCard v-for="(transaction, index) in filteredTransactions" :key="index" :transaction="transaction" @delete="deleteTransaction(index)" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TransactionCard from '../components/TransactionCard.vue'
import AchievementBadge from '../components/AchievementBadge.vue'

const transactions = ref(JSON.parse(localStorage.getItem('transactions')) || [
  { description: 'Salary', amount: 2000, type: 'Income' },
  { description: 'Groceries', amount: 150, type: 'Expense' },
])
const newTransaction = ref({ description: '', amount: 0, type: 'Income' })
const filter = ref('All')

const balance = computed(() => {
  return transactions.value.reduce((acc, t) => {
    return t.type === 'Income' ? acc + t.amount : acc - t.amount
  }, 0)
})

const filteredTransactions = computed(() => {
  if (filter.value === 'All') return transactions.value
  return transactions.value.filter(t => t.type === filter.value)
})

const achievements = computed(() => {
  const badges = []
  if (transactions.value.length >= 1) badges.push({ id: 1, name: 'First Transaction', description: 'Added your first transaction!' })
  if (transactions.value.length >= 5) badges.push({ id: 2, name: 'Frequent Tracker', description: 'Added 5 transactions!' })
  if (balance.value >= 1000) badges.push({ id: 3, name: 'Big Saver', description: 'Reached a balance of $1000!' })
  if (transactions.value.filter(t => t.type === 'Expense').length >= 3) badges.push({ id: 4, name: 'Spender', description: 'Made 3 expense transactions!' })
  return badges
})

const addTransaction = () => {
  if (newTransaction.value.description.trim() && newTransaction.value.amount > 0) {
    transactions.value.push({ ...newTransaction.value })
    newTransaction.value = { description: '', amount: 0, type: 'Income' }
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }
}

const deleteTransaction = (index) => {
  transactions.value.splice(index, 1)
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

watch(transactions, () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}, { deep: true })
</script>