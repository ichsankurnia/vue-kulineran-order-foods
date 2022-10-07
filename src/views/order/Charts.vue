<script>
import { store } from '../../utils/store'

export default {
    name: 'Charts',
    data() {
        return {
            listCharts: [],
            form: {}
        }
    },
    methods: {
        async fetchChart() {
            const res = await fetch('http://localhost:3004/keranjangs')
            const data = await res.json()
            if (res.ok) {
                this.listCharts = data
            }
        },
        async deleteFromChart(id) {
            const res = await fetch('http://localhost:3004/keranjangs/' + id, {
                method: 'DELETE'
            })
            if (res.ok) {
                this.$toast.success("Berhasil menghapus makanan dari keranjang")
                this.fetchChart()
            } else {
                this.$toast.error(res.status + " " + res.statusText)
            }
        },
        async checkOut() {
            if (this.form.nama && this.form.nomor_meja) {
                this.form.keranjangs = this.listCharts

                const res = await fetch('http://localhost:3004/pesanans', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                })

                if (res.ok) {
                    this.$toast.success("Makanan berhasil dipesan")
                    
                    // REMOVE ALL CHART AFTER SUCCESS CHECKOUT
                    await Promise.all(this.listCharts.map(async (item) => {
                        try {
                            const res = await fetch('http://localhost:3004/keranjangs/' + item.id, {
                                method: 'DELETE'
                            })
                            console.log(res)
                        } catch (error) {
                            console.log(error)                            
                        }
                    }))

                    store.increment()
                    this.$router.replace('/checkout')
                } else {
                    this.$toast.error(res.status + " " + res.statusText)
                }
            } else {
                this.$toast.warning("Nama pemesan dan Nomor meja harus diisi!")
            }
        }
    },
    mounted() {
        this.fetchChart()
    },
    computed: {
        totalHarga() {
            const count = this.listCharts.reduce((item, data, index) => {
                return item + (data.product.harga * data.jumlah_pesanan)
            }, 0)

            return count
        }
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
                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="ml-1 text-sm font-medium text-black dark:text-white md:ml-2">Keranjang</span>
                    </div>
                </li>
            </ol>
        </nav>

        <h2 class="text-2xl md:text-4xl mt-5">Keranjang <span class="font-semibold">Saya</span></h2>

        <div v-if="listCharts.length === 0" class="flex flex-col justify-center items-center h-[60vh]">
            <p>Oops.. Kamu belum menambahkan makanan ke dalam keranjang,</p>
            <p>Silakan tambahkan makanan favorit kamu terlebih dahulu <RouterLink to="/foods"
                    class="text-green font-semibold cursor-pointer hover-opacity">disini.</RouterLink>
            </p>
        </div>
        <div v-else>
            <div className="overflow-x-auto mt-5">
                <table class="w-max min-w-full">
                    <thead class="border-y border-[#d0d0d0] dark:border-gray text-left">
                        <tr>
                            <th class="py-3 w-14 text-center">#</th>
                            <th class="px-4">Foto</th>
                            <th class="px-4">Makanan</th>
                            <th class="px-4">Keterangan</th>
                            <th class="px-4">Jumlah</th>
                            <th class="px-4">Harga</th>
                            <th class="px-4">Total Harga</th>
                            <th class="px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in listCharts" :key="key" class="border-b border-[#d0d0d0] dark:border-gray">
                            <td class="text-center font-semibold">{{key + 1}}</td>
                            <td class="px-4"><img v-lazy="item.product.gambar" alt="item.product.nama"
                                    class="w-40 md:w-64 rounded-r-3xl rounded-l-3xl  py-3" /></td>
                            <td class="font-semibold">{{item.product.nama}}</td>
                            <td class="px-4">{{item.keterangan || '-'}}</td>
                            <td class="px-4">{{item.jumlah_pesanan}}</td>
                            <td class="px-4 text-center">Rp{{item.product.harga}}</td>
                            <td class="px-4 text-center font-semibold">Rp{{item.product.harga * item.jumlah_pesanan}}
                            </td>
                            <td class="font-semibold px-4"><i
                                    class="bi bi-trash text-black dark:text-white hover:text-red-500 hover-anim cursor-pointer"
                                    @click="() => deleteFromChart(item.id)"></i></td>
                        </tr>
                        <tr>
                            <td colspan="6" class="font-semibold text-right py-3">Total Harga :</td>
                            <td class="text-center font-semibold py-3">Rp{{totalHarga}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-end mt-8 md:mt-10 mb-14">
                <form class="w-full md:w-[23rem] space-y-5" v-on:submit.prevent>
                    <div class="flex flex-col space-y-1">
                        <label>Nama</label>
                        <input class="input-style py-2 px-4" placeholder="Nama pemesan" v-model="form.nama" />
                    </div>
                    <div class="flex flex-col space-y-1">
                        <label>Nomor Meja</label>
                        <input type="number" class="input-style py-2 px-4" placeholder="Nomor meja pemesan"
                            v-model="form.nomor_meja" />
                    </div>
                    <button type="submit" class="btn-primary w-32 float-right" @click="checkOut">
                        <i class="bi bi-basket-fill mr-2"></i>
                        <span>Checkout</span>
                    </button>
                </form>
            </div>
        </div>
    </main>
</template>