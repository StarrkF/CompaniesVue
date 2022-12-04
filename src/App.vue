<script setup>

import { RouterLink,RouterView } from 'vue-router';
import { ref } from 'vue';
import CompanyVue from './views/Company.vue';

const title=ref('Laravel Vue Tailwind Project')

</script>

<template>

<h2 class="my-10 text-center text-4xl font-bold text-cyan-200">{{title}}</h2>

<!-- <RouterLink to="company">Company</RouterLink> -->
<router-view></router-view>

    
</template>