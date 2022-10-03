<script>
import CardProduct from '../components/CardProduct.vue';
import { debounce } from 'lodash'

export default {
    name: "Foods",
    components: { CardProduct },
    data() {
        return {
            search: "",
            foods: []
        };
    },
    methods: {
        async fetchData() {
            const res = await fetch("http://localhost:3004/products");
            const data = await res.json();
            this.foods = data;
        },
        async searchProduct() {
            const res = await fetch("http://localhost:3004/products?q=" + this.search);
            const data = await res.json();
            this.foods = data;
        },
        _handleSearch: debounce(function (e) {
            this.search = e.target.value;
        }, 750),
    },
    mounted() {
        this.fetchData();
    },
    watch: {
        search() {
            this.searchProduct()
        }
    }
}
</script>

<template>
    <main class="max-w-desk w-full mx-auto px-5">
        <h2 class="text-2xl md:text-4xl mt-8">Daftar <span class="font-semibold">Makanan</span></h2>
        <div class="relative my-7">
            <i class="bi bi-search-heart absolute top-1.5 left-5 text-lg"></i>
            <input type="text" :value="search" @input="_handleSearch"
                class="outline-none w-full bg-transparent border border-gray rounded-lg px-14 py-2 text-white focus:border-green focus:ring-1 focus:ring-green transition-all ease-in-out duration-500"
                placeholder="Cari makanan kesukaan anda.." />
            <i class="bi bi-x-circle absolute top-1.5 right-5 text-lg hover:text-white cursor-pointer hover-anim"
                :class=" {'block': search, 'hidden': search===''}" @click="()=>search=''"></i>
        </div>

        <section class="mt-10 mb-20">
            <div v-if="foods.length === 0" class="flex justify-center items-center h-40">Retrieving Foods...</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                <CardProduct v-for="(item, key) in foods" :product="item" :key="key" />
            </div>
        </section>
    </main>
</template>