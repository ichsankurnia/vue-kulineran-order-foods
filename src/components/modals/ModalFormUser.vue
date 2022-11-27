<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Form } from 'vee-validate';
import { number, string, object, ref as yupRef } from 'yup';
import { toast } from '../../views/order/FoodDetail.vue';
import Modal from './Modal.vue';
import InputWithValidate from '../inputs/InputWithValidate.vue';
import SelectWithValidate from '../inputs/SelectWithValidate.vue';

interface Props {
    onClose: (e: MouseEvent) => void
}

const props = defineProps<Props>()

const schema = object({
    username: string().min(5).max(10).required("This field is required"),
    fullname: string().required("This field is required"),
    phone_number: string().min(9).max(14, "Phone number is too long").matches(/[0-9]+/gi, "Enter number only").required('Required'),
    email: string().email(),
    role_id: string().required("This field is required"),
    password: string().min(5).required("This field is required"),
    confirm_password: string().required().oneOf([yupRef('password')], 'Passwords do not match'),
})

const ROLE_LIST = [
    { id: 1, name: 'SUPER ADMIN' },
    { id: 2, name: 'ADMIN' },
    { id: 3, name: 'CUSTOMER' }
]

function onSubmit(values: any) {
    alert(JSON.stringify(values, null, 2));
}

function onInvalidSubmit() {
    toast.error('Invalid form')
}

</script>

<template>
    <Modal title="Create New User" :on-close="onClose">
        
            <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 md:p-10 2xl:p-12">
                    <InputWithValidate name="username" type="text" label="Username" placeholder="Enter your username" validMessage="Nice to meet you!" />
                    <InputWithValidate name="fullname" type="text" label="Fullname" placeholder="John Doe" validMessage="Nice to meet you!" />
                    <InputWithValidate name="phone_number" type="text" label="Phone Number" placeholder="628123xxxx" validMessage="Awesome mobile phone!" />
                    <InputWithValidate name="email" type="text" label="Email" placeholder="user@mail.com" validMessage="Nice email address!" />
                    <SelectWithValidate name="role_id" label="Role" key-data="id" value-data="name" :data="ROLE_LIST" valid-message="Great!" />
                    <InputWithValidate name="password" type="password" label="Password" placeholder="Min. 5 characters" validMessage="Nice and secure!" />
                    <InputWithValidate name="confirm_password" type="password" label="Re-type Password" placeholder="Min. 5 characters" validMessage="Glad you remembered it!" />
                </div>

                <div class="flex items-center space-x-4 p-5 2xl:p-8 border-t border-gray-500">
                    <button type="submit" class="btn-primary w-28">Submit</button>
                    <button type="button" class="btn-secondary w-28" @click="onClose">Cancel</button>
                </div>
            </Form>
    </Modal>
</template>