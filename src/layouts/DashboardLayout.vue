<script setup>
import UserDropdown from '../components/dropdowns/UserDropdown.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
    <div class="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-dashboardBg font-montserrat">
        
        <Sidebar />

        <div class="w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col">
            <div class="hidden lg:flex py-6 justify-between items-center px-5 2xl:px-8">
                <div>
                    <span class="text-xs">Pages / Dashboard</span>
                    <h1 class="font-bold text-3xl">Main Dashboard</h1>
                </div>
                <div class="flex items-center space-x-4 bg-white p-2.5 rounded-full shadow-2xl text-slate-500">
                    <div class="relative">
                        <i class="bi bi-search absolute left-3.5 top-2"></i>
                        <input class="input-style w-48 border-none rounded-full bg-dashboardBg font-semibold py-2.5 px-10 text-sm" placeholder="Search.." />
                    </div>
                    <i class="fa-regular fa-bell hover-opacity"></i>
                    <i class="fa-solid fa-circle-exclamation hover-opacity"></i>
                    <i class="fa-solid fa-moon hover-opacity"></i>
                    <UserDropdown />
                </div>
            </div>

            <RouterView />
            
            <div
                className='flex items-center justify-between p-5 md:px-7 lg:px-8 text-sm md:text-base mt-auto font-medium'>
                <p>Design & Develop by Ories</p>
                <p>{{new Date().getFullYear()}} © Apps v1.0</p>
            </div>
        </div>
    </div>
</template>