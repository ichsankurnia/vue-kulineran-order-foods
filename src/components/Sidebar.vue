<script setup>
import { onMounted, ref } from 'vue';
import UserDropdown from './dropdowns/UserDropdown.vue';
import { DASHBOARD_ROUTES } from '../utils/routePage'

const sidebarOpen = ref(false)
const sidebar = ref(null)

onMounted(() => {
    console.log(DASHBOARD_ROUTES)
})

const reloadPage = () => {
    window.location.href = '/'
}
</script>

<template>
    <div>
        <!-- SIDEBAR MOBILE -->
        <div class="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-10 lg:z-auto transition-opacity duration-200"
            :class="sidebarOpen? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"
            @click="sidebarOpen = false"></div>
        <div
            class="lg:hidden sticky top-0 w-full px-5 md:px-7 backdrop-blur supports-backdrop-blur:bg-white/60 transition-colors">
            <div class="h-20 flex items-center justify-between">
                <button @click="sidebarOpen = !sidebarOpen">
                    <svg v-if="sidebarOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <UserDropdown />
            </div>
            <div class="-mt-3 mb-2">
                <span class="text-xs">Pages / Dashboard</span>
                <h1>Dashboard</h1>
            </div>
        </div>

        <div id="sidebar" ref="sidebar"
            class="absolute left-0 top-0 z-10 lg:static lg:left-auto lg:top-auto h-screen bg-white text-dark lg:translate-x-0 transform transition-all duration-[600ms] ease-in-out w-64 2xl:w-72"
            :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'">
            <div class="overflow-y-auto overflow-x-hidden h-full flex flex-col text-left">
                <h1 class="cursor-pointer font-bold text-3xl 2xl:text-4xl text-center border-b border-gray py-7 2xl:py-8" @click="reloadPage">Food<span class="font-normal">Order</span></h1>
                <div class="relative inline-flex lg:hidden my-5">
                    <i class="bi bi-search absolute left-3.5 top-2 text-[#999]"></i>
                    <!-- <input class="input-style py-2 px-9 text-sm" placeholder="Search anything.." /> -->
                    <input class="input-style border-none rounded-full bg-dashboardBg font-semibold py-2.5 px-10 text-sm" placeholder="Search.." />
                </div>
                <ul class="w-full flex flex-col space-y-5 md:mt-8">
                    <RouterLink v-for="(item, key) in DASHBOARD_ROUTES" :key="key" :to="item.path"
                        v-slot="{ href, route, navigate, isActive, isExactActive }"
                    >
                        <a :href="href" @click="navigate" class="flex items-center justify-between pl-5 2xl:pl-6 hover:font-semibold hover-anim" :class="[isActive? 'text-black font-semibold': 'text-slate-500']">
                            <div class="flex items-center">
                                <i class="w-8" :class="[item.icon, isActive&&'text-green']"></i>
                                <p>{{item.name}}</p>
                            </div>
                            <div class="h-8 2xl:h-9 w-1 rounded-full" :class="[isActive?'bg-green':'bg-transparent']"></div>
                        </a>
                    </RouterLink>
                </ul>
            </div>
        </div>
    </div>
</template>