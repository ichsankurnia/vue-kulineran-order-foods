<script>
import { useToast } from 'vue-toast-notification';
import { store } from '../utils/store';

export const toast = useToast({
    position: 'bottom-left',
    duration: 5000,
    pauseOnHover: true,
})

export default {
    name: 'FoodDetail',
    data() {
        return {
            product: null,
            form: {},
        }
    },
    methods: {
        async fetchData() {
            const res = await fetch("http://localhost:3004/products/" + this.$route.params.id);
            const data = await res.json();
            this.product = data;
        },
        async addToChart() {
            if (this.form.jumlah_pesanan > 0) {
                this.form.product = this.product

                const res = await fetch("http://localhost:3004/keranjangs", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                });

                if (res.ok) {
                    store.increment()

                    toast.success("Berhasil ditambahkan ke keranjang")
                    this.$router.replace('/charts')
                } else {
                    toast.error(res.status + ' ' + res.statusText)
                }
            } else {
                toast.error("Jumlah pesanan harus diisi!")
            }
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<template>
    <main class="max-w-desk w-full mx-auto padding">
        <nav class="flex mt-8" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <RouterLink to="/"
                        class="inline-flex items-center text-sm font-medium text-[#a0a0a0] hover:text-black dark:hover:text-white">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                            </path>
                        </svg>
                        Home
                    </RouterLink>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-[#a0a0a0] dark:text-gray" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <RouterLink to="/foods"
                            class="ml-1 text-sm font-medium text-[#a0a0a0] md:ml-2 hover:text-black dark:hover:text-white">Foods
                        </RouterLink>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-[#a0a0a0] dark:text-gray" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-1 text-sm font-medium text-black dark:text-white md:ml-2">Food Order</span>
                    </div>
                </li>
            </ol>
        </nav>

        <div class="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 mt-5 mb-14">
            <img v-lazy="product?.gambar" alt="product.kode" class="w-full md:w-1/2 rounded-2xl shadow-2xl" />
            <div class="flex flex-col w-full">
                <h2 class="text-2xl md:text-4xl font-semibold mb-4">{{product?.nama}}</h2>
                <hr />
                <h3 class="text-xl md:text-2xl my-4">Harga : <span class="font-semibold">Rp{{product?.harga}}</span>
                </h3>
                <form class="space-y-5" v-on:submit.prevent>
                    <div class="flex flex-col space-y-1">
                        <label>Jumlah Pesanan</label>
                        <input type="number" class="input-style py-2 px-4" placeholder="Jumlah pesanan"
                            v-model="form.jumlah_pesanan" />
                    </div>
                    <div class="flex flex-col space-y-1">
                        <label>Keterangan</label>
                        <textarea class="input-style py-2 px-4" placeholder="Keterangan spt: Pedes, Nasi Setengah.."
                            v-model="form.keterangan" />
                    </div>
                    <button type="submit" class="btn-primary" @click="addToChart">
                        <i class="bi bi-basket-fill mr-2"></i>
                        <span>Pesan</span>
                    </button>
                </form>
            </div>
        </div>
    </main>
</template>