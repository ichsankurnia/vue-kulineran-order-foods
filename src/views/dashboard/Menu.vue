<script setup lang="ts">
import { onMounted, ref } from 'vue';
import toast from '../../utils/toast';
import Skeleton from '../../components/Skeleton.vue'


const dataTables = ref<any[]>([])
const selectedRows = ref<any[]>([])
const isFetching = ref<boolean>(true)

const fetchData = async () => {
    try {
        isFetching.value = true
        const res = await fetch('http://localhost:3004/products')
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            dataTables.value = data
            isFetching.value = false
        }
    } catch (error: any) {
        toast.error(error.message)
    }
}

onMounted(() => {
    console.log('onMounted')
    fetchData()
})


const sortByLength = (row: any, key: string) => {
    return row[key].length
}

function dateSort(a: any, b: any, key: string) {
    let date1 = new Date(a[key]).getTime();
    let date2 = new Date(b[key]).getTime();
      
    return date1 - date2;
}


</script>

<template>
    <div class="p-6 2xl:p-8">
        <div class="bg-white rounded-2xl p-5 2xl:p-6">
            <Skeleton v-if="isFetching" />
            <div v-else>
                <div class="flex justify-between items-center mb-5">
                    <h2 class="font-semibold text-xl">Products</h2>
                    <div class="flex items-center space-x-5">
                        <div className="relative">
                            <i className="fa-solid fa-magnifying-glass text-gray-400 absolute left-3 top-3" />
                            <input type='search' name="search"
                                class="placeholder-gray-400 block bg-transparent border border-gray-300 rounded-xl pl-9 py-2 pr-3 shadow-sm focus:outline-none focus:border-greenCustom focus:ring-greenCustom focus:ring-1 text-sm"
                                placeholder="Search for anything..." />
                        </div>
                        <div
                            class="bg-dashboardBg w-8 h-8 flex justify-center items-center text-greenCustom rounded-lg hover-opacity">
                            <div class="flex items-center space-x-5">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <VTable class="align-middle w-max min-w-full"
                        :sortHeaderClass="'flex items-center justify-between w-full'" :data="dataTables"
                        selectionMode="multiple" :selectOnClick="false"
                        @stateChanged="selectedRows = $event.selectedRows">
                        <template #head="{ allRowsSelected, toggleAllRows }">
                            <tr class="text-left border-b cursor-pointer">
                                <th>
                                    <input type="checkbox" class="hover-opacity accent-greenCustom" :checked="allRowsSelected" @change="toggleAllRows" />
                                </th>
                                <VTh sortKey="id">ID</VTh>
                                <VTh sortKey="kode">Code</VTh>
                                <VTh sortKey="nama">Name</VTh>
                                <VTh sortKey="harga">Price</VTh>
                                <VTh :sortKey="(row: any)=>sortByLength(row, 'gambar')">Thumbnail URL</VTh>
                            </tr>
                        </template>
                        <template #body="{ rows }">
                            <VTr v-for="row in rows" :row="row" :key="row.id" v-slot="{ isSelected, toggle }">
                                <td>
                                    <input type="checkbox" class="hover-opacity accent-greenCustom" :checked="isSelected" @change="toggle" />
                                </td>
                                <td>{{ row.id }}</td>
                                <td>{{ row.kode }}</td>
                                <td>{{ row.nama }}</td>
                                <td>{{ row.harga }}</td>
                                <td>{{ row.gambar }}</td>
                            </VTr>
                        </template>
                    </VTable>
                </div>
                <strong>Selected:</strong>
                <div v-if="selectedRows.length === 0">No rows selected</div>
                <ul>
                    <li v-for="selected in selectedRows">
                        <pre>
                            {{ selected }}
                        </pre>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>