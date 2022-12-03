<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

interface Props {
    type?: string,
    value?: string,
    name: string,
    label: string,
    validMessage?: string,
    placeholder?: string,
    icon?: string,
    onChangeType?: (e: MouseEvent) => void
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text'
})

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
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
        <input :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder" @input="handleChange" @blur="handleBlur" class="input-style" :class="[errorMessage && 'border-red-500 bg-red-50 text-dark', meta.valid && meta.validated && 'bg-green-50 text-dark', icon && 'pl-10']" />
        <div class="text-xs mt-1 ml-1 font-medium" :class="errorMessage?'text-red-500':'text-green-500'" v-show="errorMessage || (meta.valid && meta.validated)">
            <div v-if="errorMessage" class="flex items-center">
                <i class="fa-solid fa-circle-exclamation mr-1"></i>
                <p>{{ errorMessage || validMessage }}</p>
            </div>
            <p v-else>{{validMessage}}</p>
        </div>
        <i :class="icon" v-show="icon" class="absolute top-[41px] left-4 text-slate-300"></i>
        <div v-show="label.toLowerCase().includes('password')">
            <i v-if="type==='password'" class="fa-regular fa-eye absolute top-[41px] right-4 text-slate-300 hover-opacity" @click="onChangeType"></i>
            <i v-else class="fa-regular fa-eye-slash absolute top-[41px] right-4 text-slate-300 hover-opacity" @click="onChangeType"></i>
        </div>
    </div>
</template>