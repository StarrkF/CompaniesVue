<script setup>

import { RouterLink,RouterView } from 'vue-router';
import { ref } from 'vue';
import CompanyVue from './views/Company.vue';

const title=ref('Laravel Vue Tailwind Project')

</script>

<template>

    

<h2 class="my-10 text-center text-4xl font-bold text-cyan-200">{{title}}</h2>

<div class="grid grid-cols-2">
        <router-link :to="{name:'company'}"><h3 class="text-2xl text-center mx-20">Company</h3></router-link> 
<router-link :to="{name:'project'}"><h3 class="text-2xl text-center mx-20">Project</h3></router-link>
    </div>

<!-- <RouterLink to="company">Company</RouterLink> -->
<router-view></router-view>



    
</template>