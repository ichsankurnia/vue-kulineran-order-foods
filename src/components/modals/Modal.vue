<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface Props {
    title?: string,
    onClose: (e: MouseEvent) => void
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
})

const isMounted = ref<boolean>(false)

onMounted(() => {
    isMounted.value = true
    console.log("isMounted")

    onBeforeUnmount(() => {
        isMounted.value = false
        console.log("onBeforeUnmounted")
    })
})

</script>

<template>
    <div :class="isMounted ? 'open' : 'close'" class="modal-background" @click="onClose"></div>
    <div :class="isMounted ? 'open' : 'close'" class="modal">
        <div class="w-full overflow-y-auto" style="max-height: 90vh;">
            <div class="flex justify-between items-center text-lg md:text-2xl border-b border-gray-500 p-5 2xl:p-8">
                <h2 class="font-semibold">{{title}}</h2>
                <i class="fa-solid fa-xmark hover-opacity" @click="onClose"></i>
            </div>
            <slot></slot>
        </div>
    </div>
</template>