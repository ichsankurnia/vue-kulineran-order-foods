<template>
    <div class="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-light">
        <div>Sidebar</div>
        <div class="w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col">
            <div>Navbar</div>
            <RouterView />
            <div className='flex items-center justify-between p-5 sm:px-6 lg:px-8 md:text-sm mt-auto font-medium'>
                <p>Design & Develop by Apps Dev Team</p>
                <p>{{new Date().getFullYear()}} © Apps v1.0</p>
            </div>
        </div>
    </div>
</template>