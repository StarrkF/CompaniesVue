<script setup>
import useApi from '../api/api';
import { onMounted, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const { getData,showData } = useApi()
const route = useRoute()
const company_id=route.params.company_id
const projects = ref()

onMounted(()=>{
   company_id ? getCompanyProjects() : getProjects()
})


const getProjects = async () =>{
   let response = await getData('project')
   projects.value=response
}

const getCompanyProjects = async() => {
   let response = await showData('company/projects',company_id)
   projects.value=response
   console.log(projects.value)
}

</script>



<template>
   <h1>{{company_id}}</h1>
  <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 my-9">
        <thead class="bg-gray-100 dark:bg-gray-700">
            <tr class="text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">
                <th scope="col" class="py-3">
                    Id
                </th>
                <th scope="col">
                    Company
                </th>
                <th scope="col">
                    Title
                </th>
                <th scope="col">
                    Amount
                </th>
                <th scope="col">
                    Action
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <tr  v-for="project in projects" :key="project.id"  class="hover:bg-gray-100 dark:hover:bg-gray-700 text-center  duration-300 text-sm text-slate-700 dark:text-white">
                <td class="py-4 px-6">{{project.id}}</td>
                <td class="py-4 px-6">{{project.company.name}}</td>
                <td class="py-4 px-6">{{project.title}}</td>
                <td class="py-4 px-6">${{project.amount}}</td>
                <td class="py-4 px-6"> 
                  <div class="grid md:grid-cols-2 gap-2">
                      <!-- <button @click="showCompany(company.id)" class="bg-blue-800 p-2 rounded-md hover:bg-blue-400 duration-200">Update</button>
                      <button @click="deleteCompany(company.id)" class="bg-red-800 p-2 rounded-md hover:bg-red-400 duration-200">Delete</button> -->
                  </div> 
                </td>
            </tr>
        </tbody>
      </table>
</template>
