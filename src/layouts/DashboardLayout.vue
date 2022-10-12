<script setup>
import UserDropdown from '../components/dropdowns/UserDropdown.vue'
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
    <div class="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-light font-montserrat">
        
        <Sidebar />

        <div class="w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col">
            <div class="hidden lg:flex h-20 justify-between items-center px-5 2xl:px-8">
                <div>
                    <span class="text-xs">Pages / Dashboard</span>
                    <h1>Dashboard</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <i class="bi bi-search absolute left-3.5 top-2 text-[#999]"></i>
                        <input class="input-style py-2 px-9 text-sm" placeholder="Search anything.." />
                    </div>
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