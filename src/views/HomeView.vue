<script >
import TheWelcome from '../components/TheWelcome.vue';
import { RouterLink } from "vue-router";
import CardProduct from '../components/CardProduct.vue';

export default {
    data() {
        return {
            foods: []
        };
    },
    methods: {
        async fetchData() {
            const res = await fetch("http://localhost:3004/best-products");
            const data = await res.json();
            this.foods = data;
        }
    },
    mounted() {
        this.fetchData();
    },
    components: { CardProduct }
}
</script>

<template>
  <main class="max-w-desk w-full mx-auto px-5">

    <!-- HERO -->
    <div class="flex flex-col-reverse md:flex-row items-center justify-between">
      <div>
        <h2 class="text-2xl md:text-4xl">
          <span class="font-semibold">Delicious Food Menu,</span>
          <br />in Your Gadget
        </h2>
        <p class="mt-3 mb-6">Ayo segera pilih dan pesan makanan favorit Anda</p>
        <RouterLink class="bg-green text-white px-4 py-2.5 rounded-lg hover-opacity" to="/foods">
          <i class="bi bi-arrow-right mr-2"></i>Pesan
        </RouterLink>
      </div>
      <img alt="hero" src="../assets/images/hero.png" class="w-full md:w-5/12 my-5 md:my-0" />
    </div>

    <!-- Section -->
    <section class="mt-10 mb-20">
      <div class="flex justify-between items-center">
        <h2 class="text-xl md:text-3xl">Best <span class="font-semibold">Foods</span></h2>
        <RouterLink class="bg-green text-white px-4 py-2.5 rounded-lg hover-opacity" to="/foods">
          <i class="bi bi-eye-fill mr-2"></i>Lihat Semua
        </RouterLink>
      </div>

      <div v-if="foods.length === 0" class="flex justify-center items-center h-40">Retrieving Foods...</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8" >
        <CardProduct v-for="(item, key) in foods" :product="item" :key="key" />
        <!-- <div v-for="(item, key) in foods" :key="key">
          <img v-lazy="item.gambar" alt="item.kode" class="rounded-t-2xl w-full h-52 md:h-[16.5rem] object-cover" />
          <div class="border border-t-0 rounded-b-2xl py-5 px-6">
            <h3 class="text-xl mb-1 font-medium">{{item.nama}}</h3>
            <p>Harga : Rp{{item.harga}}</p>
            <button class="bg-green px-4 py-2 rounded-lg flex item-center mt-3 hover-opacity">
              <i class="bi bi-basket-fill mr-2"></i>
              <span>Pesan</span>
            </button>
          </div>
        </div> -->
      </div>
    </section>
  </main>
</template>
