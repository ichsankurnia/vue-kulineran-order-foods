<script setup >
import { RouterLink, RouterView } from "vue-router";
import { useDark, useToggle } from '@vueuse/core';
import { onMounted, ref, watch } from "vue";
import { store } from "../utils/store";

const isDark = useDark()
const toggleDark = useToggle(isDark)

const chartTotal = ref(0)


const fetchChart = async () => {
  const res = await fetch('http://localhost:3004/keranjangs')
  const data = await res.json()

  console.log("Fetching charts length :", data)
  if (res.ok) {
    chartTotal.value = data.length
  }
}

onMounted(() => {
  fetchChart()
})

watch(() => store.count, (newVal, oldVal) => {
  console.log(newVal, oldVal);
  fetchChart()
}, { deep: true });

const reloadPage = () => {
  window.location.href = '/'
}

</script>
    
<template>
  <div
    class="font-montserrat flex flex-col min-h-screen transition-all ease-in-out duration-500 text-darksoft dark:text-gray bg-light dark:bg-dark">
    <header class="max-w-desk w-full mx-auto padding flex justify-between items-center py-3">
      <div class="flex items-end">
        <h1 class="text-black dark:text-white font-medium text-3xl cursor-pointer hover-opacity" @click="reloadPage()">
          Kulineran</h1>
        <nav class="ml-5 space-x-2 pb-0.5">
          <RouterLink to="/" class="text-darksoft dark:text-gray hover:text-black dark:hover:text-white hover-opacity"
            :exact-active-class="'text-green dark:text-green font-medium'">Home</RouterLink>
          <RouterLink to="/foods"
            class="text-darksoft dark:text-gray hover:text-black dark:hover:text-white hover-opacity"
            :exact-active-class="'text-green dark:text-green font-medium'">Foods</RouterLink>
          <RouterLink to="/about"
            class="hidden md:inline-flex text-darksoft dark:text-gray hover:text-black dark:hover:text-white"
            :exact-active-class="'text-green dark:text-green font-medium'">About</RouterLink>
        </nav>
      </div>
      <div class="flex items-center space-x-1.5 hover:opacity-70 hover-opacity cursor-pointer"
        @click="() => this.$router.push('/charts')">
        <h3 class="hidden md:block">Keranjang</h3>
        <i class="bi bi-cart3 text-lg"></i>
        <span class="bg-green text-white rounded text-xs w-4 h-4 flex items-center justify-center">{{chartTotal}}</span>
      </div>
    </header>

    <RouterView />

    <button @click="toggleDark()"
      class="fixed bottom-10 md:bottom-20 right-8 md:left-6 2xl:left-20 w-10 h-10 flex justify-center items-center rounded-full shadow-lg hover-opacity text-gray dark:text-darksoft bg-darksoft dark:bg-light text-xl">
      <i v-if="isDark" class="bi bi-sun-fill"></i>
      <i v-else class="bi bi-moon-fill"></i>
    </button>

    <footer class="border-t-2 dark:border-t border-[#e0e0e0] dark:border-stone-700 mt-auto w-full">
      <!-- <hr /> -->
      <div class="max-w-desk w-full mx-auto padding flex justify-between items-center py-5 text-xs md:text-base">
        <p>{{new Date().getFullYear()}} Copyright Kulineran</p>
        <p>Made by Vue & TailwindCSS</p>
      </div>
    </footer>
  </div>
</template>