<script setup lang="ts">
import { nextTick, onMounted, toRef } from 'vue';
import { useField } from 'vee-validate';

interface Props {
    value?: string,
    name: string,
    label: string,
    validMessage?: string,
    icon?: string,
    keyData?: string,
    valueData?: string,
    data?: any[],
    onChangeType?: (e: MouseEvent) => void
}

const props = defineProps<Props>()

const name = toRef(props, 'name');

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});

</script>

<template>
    <div class="flex flex-col relative">
        <label class="label-input" :for="name">{{ label }}</label>
        <select :name="name" :id="name" :value="inputValue" @input="handleChange" @blur="handleBlur" class="input-style font-medium" :class="[errorMessage && 'border-red-500 bg-red-50 text-dark', meta.valid && meta.validated && 'bg-green-50 text-dark', icon && 'pl-10']">
            <option class="bg-[#37353b] text-white text-sm font-medium" value="">- Select role -</option>
            <option class="bg-[#37353b] text-white text-sm font-medium" v-for="(item, key) in data" :key="key" :value="item[keyData!]">{{item[valueData!]}}</option>
        </select>
        <div class="text-xs mt-1 ml-1 font-medium" :class="errorMessage?'text-red-500':'text-green-500'" v-show="errorMessage || (meta.valid && meta.validated)">
            <div v-if="errorMessage" class="flex items-center">
                <i class="fa-solid fa-circle-exclamation mr-1"></i>
                <p>{{ errorMessage || validMessage }}</p>
            </div>
            <p v-else>{{validMessage}}</p>
        </div>
        <i :class="icon" v-show="icon" class="absolute top-[41px] left-4 text-slate-300"></i>
    </div>
</template>