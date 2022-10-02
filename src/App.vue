<script >
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  methods: {
    reloadPage(){
      window.location.href = '/'
    }
  }
}

</script>

<template>
  <div class="font-montserrat flex flex-col h-screen text-gray">
    <header class="max-w-desk w-full mx-auto px-5 flex justify-between items-center py-2">
      <div class="flex items-end">
        <h1 class="text-white font-medium text-3xl cursor-pointer hover-opacity" @click="reloadPage()">Kulineran</h1>
        <nav class="ml-5 space-x-2 text-gray pb-0.5">
          <RouterLink to="/" class="hover:text-white hover-opacity" active-class="text-green font-medium">Home</RouterLink>
          <RouterLink to="/about" class="hover:text-white" active-class="text-green font-medium">About</RouterLink>
        </nav>
      </div>
      <div class="flex items-center space-x-1.5 hover:opacity-70 hover-opacity cursor-pointer" @click="() => this.$router.push('/keranjang')">
        <h3 class="hidden md:block">Keranjang</h3>
        <i class="bi bi-cart3 text-lg"></i>
        <span class="bg-green text-white rounded text-xs w-4 h-4 flex items-center justify-center">2</span>
      </div>
    </header>
  
    <RouterView />

    <footer class="border-t border-solid border-x-0 border-b-0 border-stone-700 mt-auto w-full">
      <!-- <hr /> -->
      <div class="max-w-desk w-full mx-auto px-5 flex justify-between items-center py-5 text-xs md:text-base">
        <p>{{new Date().getFullYear()}} Copyright Kulineran</p>
        <p>Made by Vue & TailwindCSS</p>
      </div>
    </footer>
  </div>
</template>