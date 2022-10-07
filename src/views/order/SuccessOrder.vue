<script>
    import checkout from '../../assets/images/menunggu.png'
    export default {
        name: "SuccessOrder",
        computed: {
            banner(){
                return checkout
            }
        }
    }
</script>

<template>
    <main class="max-w-desk w-full mx-auto px-5">
        <div class="h-[75vh] flex-col flex justify-center items-center">
            <img v-lazy="banner" alt="checkout" />
            <h2 class="font-semibold text-2xl md:text-4xl">Sukses!!!</h2>
            <h4 class="text-center text-lg md:text-xl mt-2">Pesanan Anda segera diproses <br />Selamat Menunggu</h4>
        </div>
    </main>
</template>