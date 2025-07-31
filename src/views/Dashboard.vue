<template>
  <div class="container mx-auto p-4 sm:p-6">
    <!-- Balance Display -->
    <div class="mb-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow text-center">
      <h2 class="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">Current Balance</h2>
      <p class="text-xl sm:text-3xl font-bold" :class="{ 'text-green-500': balance >= 0, 'text-red-500': balance < 0 }">${{ balance.toFixed(2) }}</p>
    </div>

    <!-- Transaction Input -->
    <div class="mb-6 flex flex-col gap-3 sm:gap-4 sm:flex-row">
      <input v-model="newTransaction.description" type="text" placeholder="Description (e.g., Salary, Coffee)" class="flex-1 p-2 sm:p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base">
      <input v-model.number="newTransaction.amount" type="number" placeholder="Amount" class="w-full sm:w-32 p-2 sm:p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base">
      <select v-model="newTransaction.type" class="p-2 sm:p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none text-xs sm:text-base">
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <button @click="addTransaction" class="finance-button">Add</button>
    </div>

    <!-- Filter Buttons -->
    <div class="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
      <button @click="filter = 'All'" :class="{ 'finance-button': filter === 'All', 'finance-button-inactive': filter !== 'All' }">All</button>
      <button @click="filter = 'Income'" :class="{ 'finance-button': filter === 'Income', 'finance-button-inactive': filter !== 'Income' }">Income</button>
      <button @click="filter = 'Expense'" :class="{ 'finance-button': filter === 'Expense', 'finance-button-inactive': filter !== 'Expense' }">Expense</button>
    </div>

    <!-- Transaction List -->
    <div class="grid gap-3 sm:gap-4">
      <TransactionCard v-for="(transaction, index) in filteredTransactions" :key="index" :transaction="transaction" @delete="deleteTransaction(index)" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TransactionCard from '../components/TransactionCard.vue'

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
</script>