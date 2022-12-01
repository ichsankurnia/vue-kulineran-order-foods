<script setup>
import bg from '../assets/images/blobz-bg.jpg'
import { Form } from 'vee-validate';
import {string, object} from 'yup';
import InputWithValidate from '../components/inputs/InputWithValidate.vue'
import { ref } from 'vue';
import ModalFormUser from '../components/modals/ModalFormUser.vue';
import toast from '../utils/toast';


const isPassword = ref(true)
const isModalOpen = ref(false)

const schema = object({
    username: string().required("This field is required"),
    password: string().min(5).required("This field is required")
})

function onSubmit(values) {
  alert(JSON.stringify(values, null, 2));
}

function onInvalidSubmit() {
    toast.error('Invalid form')
}

</script>

<template>
    <div class='w-full h-screen bg-cover font-montserrat overflow-hidden' :style="{ 'background-image': `url('${bg}')` }">
        <div class="grid grid-cols-1 lg:grid-cols-2">
            
            <div class="bg-white text-dark font-medium flex justify-center h-screen overflow-y-auto">
                <div class="w-full md:w-[90%] xl:w-[85%] 2xl:w-[65%] flex flex-col p-5">
                    <div class="flex item-center text-slate-500 mb-10 hover-opacity">
                        <i class="fa-solid fa-angle-left flex justify-center items-center mr-2"></i>
                        <p >Back</p>
                    </div>
                    <div class="h-full flex flex-col justify-center">
                        <h1 class="text-dark text-3xl font-bold">Sign In</h1>
                        <p class="text-slate-500">Enter your credential to sign in!</p>
        
                        <div class="bg-dashboardBg w-full flex items-center justify-center rounded-2xl py-3 hover-opacity my-10">
                            <i class="fa-brands fa-google mr-2"></i>
                            <p>Sign in with Google</p>
                        </div>
        
                        <div class="flex flex-col items-center">
                            <hr class="w-full border-slate-300" />
                            <p class="bg-white w-16 -mt-3 text-center">or</p>
                        </div>
        
                        <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
                            <div class="my-10 space-y-5 2xl:space-y-7">
                                <!-- <Field name="username" v-slot="{ field }">
                                    <label class="label-input text-dark">Username / Phone / Email</label>
                                    <input class="input-style" v-bind="field" placeholder="admin or 0812xxx or user@mail.com" />
                                    <ErrorMessage name="username" />
                                </Field> -->
                                <InputWithValidate 
                                    name="username"
                                    type="text"
                                    label="Username / Phone / Email"
                                    placeholder="admin or 0812xxx or user@mail.com"
                                    validMessage="Nice to meet you!"
                                />
                                <InputWithValidate 
                                    name="password"
                                    :type="isPassword?'password':'text'"
                                    label="Password"
                                    placeholder="Min. 5 characters"
                                    validMessage="Glad you remembered it!"
                                    :onChangeType="()=>isPassword = !isPassword"
                                />
                                <!-- <div>
                                    <label class="label-input text-dark">Username / Phone / Email</label>
                                    <input class="input-style" placeholder="admin or 0812xxx or user@mail.com" />
                                </div> -->
                                <!-- <div>
                                    <label class="label-input text-dark">Password</label>
                                    <input type="password" class="input-style" placeholder="Min. 5 characters" />
                                </div> -->
                                <div class="flex justify-between items-center">
                                    <div class="flex">
                                        <input name="rememberMe" id="rememberMe" type="checkbox" />
                                        <label class="ml-2 cursor-pointer" for="rememberMe">Keep me logged in</label>
                                    </div>
                                    <p class="text-greenCustom hover-opacity">Forgot password?</p>
                                </div>
                                <button type="submit" class="btn-primary">Sign In</button>
        
                                <p>Not registered yet? <RouterLink class="text-greenCustom" to="sign-up">Create Account</RouterLink></p>
                            </div>
                        </Form>
                    </div>
    
                    <button class="btn-primary" @click="()=> isModalOpen=!isModalOpen">Open Modal</button>
                    <p class="mt-auto text-slate-500 text-xs md:text-sm 2xl:text-base">© {{new Date().getFullYear()}} FoodOrder. All Rights Reserved. Made by Ories</p>
                </div>
            </div>

            <div class="hidden lg:block relative h-screen" >
                <div class="tk-blob w-[33rem] 2xl:w-[35rem] absolute top-[20%] 2xl:top-1/4 left-[15%] 2xl:left-1/4" style="--fill: #ffc107;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428.4 394.6">
                        <path
                            d="M369.4 109.2c43.2 55.3 71.5 121.4 53.4 167.3-18.2 45.8-82.8 71.4-140.5 91.7-57.8 20.4-108.7 35.4-152.9 20.3C85.1 373.4 47.6 328.3 23.2 267c-24.5-61.2-35.8-138.6-2.5-191.7C54.1 22.2 132-6.6 200 1.3c68 7.9 126.1 52.5 169.4 107.9z">
                        </path>
                    </svg>
                </div>
                <div class="tk-blob w-[30rem] 2xl:w-[32rem] absolute top-[20%] 2xl:top-1/4 left-[15%] 2xl:left-1/4" style="--fill: #ff4b82;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319.2 356.7">
                        <path
                            d="M271.9 50.3c30.6 29.3 51.3 75.5 46.6 123.9-4.6 48.4-34.6 99-86.5 136.3s-125.6 61.4-168.3 35.3S9.4 243.5 3.4 177.3C-2.7 111.2-3.1 55.2 24 26.7 51.1-1.9 105.9-2.9 153.4 2.8c47.6 5.8 88 18.2 118.5 47.5z">
                        </path>
                    </svg>
                </div>
                <div class="tk-blob w-[30rem] 2xl:w-[32rem] absolute top-[20%] 2xl:top-1/4 left-[15%] 2xl:left-1/4 left-1/5" style="--time: 20s; --amount: 5; --fill: #00BD7E;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 747.2 726.7">
                        <path
                            d="M539.8 137.6c98.3 69 183.5 124 203 198.4 19.3 74.4-27.1 168.2-93.8 245-66.8 76.8-153.8 136.6-254.2 144.9-100.6 8.2-214.7-35.1-292.7-122.5S-18.1 384.1 7.4 259.8C33 135.6 126.3 19 228.5 2.2c102.1-16.8 213.2 66.3 311.3 135.4z">
                        </path>
                    </svg>
                </div>
                <div class="tk-blob absolute top-0 left-0 w-32 2xl:w-52" style="--fill: #93807d;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.7 325.5">
                        <path d="M363.8 52.4c42.8 41.3 68 108.8 47.9 153.5-20.1 44.8-85.6 66.7-143 87.4-57.4 20.8-106.8 40.3-156.7 28.7C62 310.4 11.5 267.7 1.8 217.7c-9.7-49.9 21.5-107 61.5-147.6C103.2 29.5 152 5.3 206.4.8c54.5-4.6 114.7 10.4 157.4 51.6z"></path>
                    </svg>
                </div>
                <div class="tk-blob absolute top-0 right-0 w-32 2xl:w-52" style="--fill: #e91e63;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.6 385.5">
                        <path d="M381.4 86.5c43.5 48 77.5 110.3 68.8 168.7-8.6 58.4-59.9 113-114.8 126.7-54.9 13.6-113.4-13.7-176.6-40.6-63.1-27-130.7-53.5-151.5-102.8-20.9-49.2 5.1-121.1 50.3-169.5C102.8 20.7 167.1-3.9 225.9.5c58.8 4.5 111.9 38.1 155.5 86z"></path>
                    </svg>
                </div>
                <div class="tk-blob absolute bottom-0 left-0 w-32 2xl:w-52" style="--fill: #607d8b;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412.3 354.7">
                        <path d="M320.8 58.4c47.1 38.8 97.8 95 90.8 143s-71.7 87.7-138.3 117.2c-66.5 29.5-134.7 48.7-186.4 26.5C35.3 322.9.3 259.3 0 203.3-.3 147.4 34.1 99.2 71 62.8 107.9 26.3 147.2 1.7 188.7.1c41.4-1.7 84.9 19.6 132.1 58.3z"></path>
                    </svg>
                </div>
                <div class="tk-blob absolute bottom-0 right-0 w-32 2xl:w-52">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440.7 428.7">
                        <path d="M410.6 78.8c36 52.5 36.1 126 19.2 194C412.9 340.7 379 403 330 421.9c-49 19-113.1-5.3-178.6-34C85.8 359.2 18.7 326.1 3.5 276.4-11.7 226.7 25 160.3 71.7 105.3 118.3 50.3 174.8 6.8 239 .7c64.1-6 135.7 25.5 171.6 78.1z"></path>
                    </svg>
                </div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-96 text-center">
                    <h1 class="text-6xl font-bold">Food<span class="font-normal">Order</span></h1>
                    <p class="font-medium">Find and eat your order directly on the spot</p>
                </div>
            </div>
            
        </div>

        <ModalFormUser v-if="isModalOpen" :onClose="()=>isModalOpen=false" />
    </div>

</template>