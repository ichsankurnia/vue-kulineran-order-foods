<template>
    <div class="shadow rounded-md p-4 w-full">
            <div class="animate-pulse1s flex space-x-4">
                <div class="flex-1 py-1">
                    <div class="h-12 bg-slate-300 rounded-md mb-6"></div>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div v-for="(item, key) in [0, 1,2,3,4,5]" class="h-6 bg-slate-300 rounded-md" :key="key"></div>
                    </div>
                    <div class="flex items-center justify-between mt-10">
                        <div class="h-4 bg-slate-300 rounded-md w-20 md:w-40 2xl:w-52"></div>
                        <div class="h-4 bg-slate-300 rounded-md w-20 md:w-40 2xl:w-52"></div>
                    </div>
                </div>
            </div>
        </div>
</template>