<script setup lang="ts">
import { ref } from 'vue';
import Skeleton from '../Skeleton.vue';


export interface ITableColumn {
    Header: string | HTMLElement | any,
    field: string,
    Cell?: HTMLElement | any,
    width?: number,
    isSort?: boolean,
    sortKey?: string,
    sortType?: 'default' | 'length' | 'date'
}

interface Props {
    colums: ITableColumn[],
    dataTables: any[],
    isFetching: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    isFetching: false,
    sortType: 'default',
})

const selectedRows = ref<any[]>([])
const totalPages = ref<number>(1)
const pageSize = ref<number>(20)
const currentPage = ref<number>(1)

enum SortOrder {
    DESC = -1,
    NONE = 0,
    ASC = 1
}

const dateSort = (a: any, b: any, sortOrder: SortOrder, key: string) => {
    let date1 = new Date(a[key]).getTime();
    let date2 = new Date(b[key]).getTime();

    if (sortOrder === 1) {
        return date1 - date2
    } else if (sortOrder === -1) {
        return date2 - date1
    } else {
        return 0
    }
}

const sortByLength = (row: any, key: string) => {
    return row[key].length
}

</script>

<template>
    <Skeleton v-if="isFetching" />
    <div v-else>
        <div class="overflow-x-auto">
            <VTable class="align-middle w-max min-w-full" :sortHeaderClass="'flex items-center justify-between w-full'"
                :data="dataTables" selectionMode="multiple" :selectOnClick="false"
                @stateChanged="selectedRows = $event.selectedRows" :page-size="Number(pageSize)"
                v-model:currentPage="currentPage" :totalPages="totalPages" @totalPagesChanged="totalPages = $event">
                <template #head="{ allRowsSelected, toggleAllRows }">
                    <tr class="text-left border-b cursor-pointer">
                        <th>
                            <input type="checkbox" class="hover-opacity accent-greenCustom mr-2" :checked="allRowsSelected" @change="toggleAllRows" />
                        </th>
                        <VTh v-for="(header, key) in colums" :key="key" class="truncate py-2 px-1"
                            :sortKey="header.sortType === 'length' ? (row: any) => sortByLength(row, header.sortKey || header.field) : header.sortKey || header.field"
                            :customSort="header.sortType === 'date' ? (a: any, b: any, sort: SortOrder) => dateSort(a, b, sort, header.sortKey || header.field) : undefined"
                            :style="{ 'width': `${header.width}px` || '50px' }"
                        >
                            {{ header.Header }}
                        </VTh>
                    </tr>
                </template>
                <template #body="{ rows }">
                    <VTr v-for="row in rows" :row="row" :key="row.id" v-slot="{ isSelected, toggle }">
                        <td>
                            <input type="checkbox" class="hover-opacity accent-greenCustom mr-2" :checked="isSelected" @change="toggle" />
                        </td>
                        <td v-for="(cell, key) in colums" :key="key" :style="{ 'width': `${cell.width}px` || '50px' }" class="py-3 px-1" >
                            {{ cell.Cell ? cell.Cell({ row: row, value: row[cell.field] }) : row[cell.field] }}
                        </td>
                    </VTr>
                </template>
            </VTable>
        </div>
        <div class="mt-5 mb-10 flex justify-between items-center text-sm">
            <div class="flex items-center space-x-2">
                <div class="flex items-center">
                    <p>Page</p>
                    <div class="font-semibold flex space-x-[3px] ml-1">
                        <p>{{ currentPage }}</p>
                        <p>of</p>
                        <p>{{ totalPages }}</p>
                    </div>
                </div>
                <div class="font-semibold">|</div>
                <select v-model="pageSize"
                    class="border outline-none pl-2 pr-0 py-0.5 rounded-lg cursor-pointer input-style">
                    <option>2</option>
                    <option>5</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
            <VTPagination class="pagination page-link page-item" :maxPageLinks="4" v-model:currentPage="currentPage"
                :totalPages="totalPages" :boundary-links="true">
                <template #firstPage>
                    <i class="fa-solid fa-angles-left hidden md:block"></i>
                </template>
                <template #lastPage>
                    <i class="fa-solid fa-angles-right hidden md:block"></i>
                </template>
                <template #next>
                    <i class="fas fa-angle-right" />
                </template>
                <template #previous>
                    <i class="fas fa-angle-left" />
                </template>
            </VTPagination>
        </div>

        <!-- SELECTED ROWS -->
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
</template>