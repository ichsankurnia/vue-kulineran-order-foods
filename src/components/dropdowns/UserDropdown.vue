<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { TransitionRoot } from '@headlessui/vue'

const dropdownOpen = ref(false)
const trigger = ref(null);
const dropdown = ref(null);

onMounted(() => {
    const clickHandler = ({ target }) => {
        if (!dropdownOpen || dropdown.value?.contains(target) || trigger.value?.contains(target)) return;
        dropdownOpen.value = false
    };

    const keyHandler = ({ keyCode }) => {
        if (!dropdownOpen.value || keyCode !== 27) return;
        dropdownOpen.value = false
    };

    nextTick(() => {
        console.log("Next tick")
        document.addEventListener('keydown', keyHandler);
        document.addEventListener('click', clickHandler);
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', clickHandler);
        document.removeEventListener('keydown', keyHandler);
    })
})

const reloadPage = () => {
    window.location.reload()
}
</script>

<template>
    <div class="relative" @click="dropdownOpen = !dropdownOpen" ref="trigger">
        <div class="w-10 h-10 bg-slate-500 rounded-full cursor-pointer"></div>
        <TransitionRoot :show="dropdownOpen" enter="transition ease-out duration-500"
            enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100" leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="bg-white origin-top-left z-10 absolute top-full right-0 w-max mt-1 rounded-xl shadow-lg py-4 px-5 flex flex-col">
            <div ref="dropdown">
                <div class="font-semibold">Hello, User Name</div>
                <ul className='flex flex-col font-medium text-sm text-left border-t border-gray mt-2 pt-3 space-y-3.5'>
                    <li>Profile Settings</li>
                    <li class="text-rose-500 cursor-pointer hover-opacity" @click="reloadPage">Logout</li>
                </ul>
            </div>
        </TransitionRoot>
    </div>
</template>