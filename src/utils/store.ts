// store.js
import { onMounted, reactive, watch } from 'vue'

export const store = reactive({
    count: 0,
    increment() {
        this.count++
    }
})