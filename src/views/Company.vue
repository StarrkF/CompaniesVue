<script setup>
import useApi from "../api/api"
import { onMounted, ref } from "vue"
import { RouterLink } from "vue-router";



    const  { getData,showData,insertData,updateData,deleteData } = useApi()
    const companies = ref()
    const company = ref({
      name:null,email:null,head_count:null
    });
    const InsertSection = ref(false);
    const insertButton = ref(false)
    const insertSectionButton = ref(true)
    const updateButton = ref(false)
    const cancelButton = ref(false)
      
    onMounted(()=>{
      getCompanies()
    })

    const showInsert = () => {
      insertSectionButton.value=false
      InsertSection.value=true
      insertButton.value=true
      cancelButton.value=true
    }

    const showUpdate = () => {
      insertSectionButton.value=false
      InsertSection.value=true
      updateButton.value=true
      cancelButton.value=true
    }

    const baseView = () =>{
      insertSectionButton.value=true
      InsertSection.value=false
      updateButton.value=false
      insertButton.value=false
      cancelButton.value=false
    }

    
    const getCompanies = async () => {
      let response= await getData('company')
      companies.value=response
    }


    const insertCompany = async () => {
      
      console.log(company.value)
      await insertData('company',{
        name:company.value.name,
        email:company.value.email,
        head_count:company.value.head_count
      })
      getCompanies()
      baseView()
    }

    const showCompany = async (id) => {
      insertButton.value=false
      company.value=await showData('company',id)
      showUpdate()
      window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const updateCompany = async () => {

      await updateData(
        'company',
        company.value.id,
        company.value
      )
      getCompanies()
      baseView()
    }

    const deleteCompany = async (id) => {

      window.confirm('Are You Sure?') ? await deleteData('company',id) : ''

      getCompanies()
      
    }




</script>

<template>
  <div class="m-10">
    <button v-show="insertSectionButton" @click="showInsert" class="p-3 rounded-md bg-cyan-600 hover:bg-cyan-800 duration-300">Add Company</button>
 
    <div v-show="InsertSection" class="my-10">
      <input v-model="company.name" type="text" class="mx-2 p-3 rounded-md text-cyan-700" placeholder="Company Name" id="">
      <input v-model="company.email" type="email" class="mx-2 p-3 rounded-md text-cyan-700" placeholder="Company Email" id="">
      <input v-model="company.head_count" type="number" class="mx-2 p-3 rounded-md text-cyan-700" placeholder="Number of Employee" id="">
      <button v-show="insertButton" @click="insertCompany" class="mx-2 p-3 rounded-md bg-emerald-700 hover:bg-emerald-400 duration-300">Add</button>
      <button v-show="updateButton" @click="updateCompany" class="mx-2 p-3 rounded-md bg-yellow-600 hover:bg-yellow-400 duration-300">Save</button>
      <button v-show="cancelButton" @click="baseView" class="mx-2 p-3 rounded-md bg-rose-700 hover:bg-rose-400 duration-300">Cancel</button>
    </div>
    
  
 
    <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 my-9">
        <thead class="bg-gray-100 dark:bg-gray-700">
            <tr class="text-xs font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">
                <th scope="col" class="py-3">
                    Id
                </th>
                <th scope="col">
                    Name
                </th>
                <th scope="col">
                    email
                </th>
                <th scope="col">
                    Count of Employee
                </th>
                <th scope="col">
                    Count of Project
                </th>
                <th scope="col">
                    Action
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <tr  v-for="company in companies" :key="company.id"  class="hover:bg-gray-100 dark:hover:bg-gray-700 text-center  duration-300 text-sm text-slate-700 dark:text-white">
                <td class="py-4 px-6">{{company.id}}</td>
                <td class="py-4 px-6">{{company.name}}</td>
                <td class="py-4 px-6">{{company.email}}</td>
                <td class="py-4 px-6">{{company.head_count}}</td>
                <td class="py-4 px-6">
                  <router-link :to="{name:'project',params:{company_id:company.id}}" class="bg-orange-400 p-3 rounded-md text-slate-800 font-bold hover:bg-yellow-300 duration-300" >{{company.projects_count}}</router-link>
                </td>
                <td class="py-4 px-6"> 
                  <div class="grid md:grid-cols-2 gap-2">
                      <button @click="showCompany(company.id)" class="bg-blue-800 p-2 rounded-md hover:bg-blue-400 duration-200">Update</button>
                      <button @click="deleteCompany(company.id)" class="bg-red-800 p-2 rounded-md hover:bg-red-400 duration-200">Delete</button>
                  </div> 
                </td>
            </tr>
        </tbody>
      </table>
  

  </div>
</template>
