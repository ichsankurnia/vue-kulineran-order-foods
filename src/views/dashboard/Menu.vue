<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from 'vue';
import toast from '../../utils/toast';
import TableDefault, { ITableColumn } from '../../components/tables/TableDefault.vue';


const dataTables = ref<any[]>([])
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
    fetchData()
})

const handleEdit = (e: MouseEvent, row: any) => {
    console.log(row)
}

const columns: ITableColumn[] = [
    {
        Header: "No",
        field: 'no',
        Cell: ({ index }) => {
            return index + 1
        }
    },
    {
        Header: "ID",
        field: 'id',
        width: 50,
        Cell: ({ row, value }) => {
            return value
        }
    },
    {
        Header: 'Code',
        field: 'kode',
        width: 70,
    },
    {
        Header: 'Name',
        field: 'nama',
        width: 200,
    },
    {
        Header: 'Price',
        field: 'harga',
        width: 100,
    },
    {
        Header: 'Date',
        field: 'tanggal',
        sortType: 'date',
        width: 200,
    },
    {
        Header: 'Thumbnail URL',
        field: 'gambar',
        sortType: 'length',
        width: 900,
    }
]
</script>

<template>
    <div class="p-6 2xl:p-8">

        <div class="bg-white rounded-2xl p-5 2xl:p-6">
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
            <TableDefault 
                :colums="columns" :data-tables="dataTables" 
                :is-fetching="isFetching" 
                :action="{
                    enable: true,
                    onUpdate: handleEdit,
                    onDelete: handleEdit,
                }"
            />
        </div>
    </div>
</template>