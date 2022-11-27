<script>
    export default {
        name: 'CardProduct',
        props: {
            product: Object
        }
    }
</script>

<template>
    <div>
        <div class="imgBox w-full cursor-pointer" @click="() => this.$router.push('/foods/' + product.id)">
            <img v-lazy="product.gambar" alt="product.kode" class="rounded-t-2xl w-full h-52 md:h-[16.5rem] object-cover block" />
        </div>
        <div class="border-0 dark:border border-t-0 dark:border-grayCustom rounded-b-2xl py-5 px-6 -mt-2 shadow-2xl dark:shadow-none">
            <h3 class="text-xl mb-1 font-medium">{{product.nama}}</h3>
            <p>Harga : Rp{{product.harga}}</p>
            <RouterLink :to="'/foods/' + product.id" class="bg-greenCustom text-white w-28 py-2 rounded-lg mt-3 hover-opacity flex justify-center items-center">
                <i class="bi bi-basket-fill mr-2"></i>
                <span>Pesan</span>
            </RouterLink>
        </div>
    </div>
</template>