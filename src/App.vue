<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import {ref} from 'vue'

const counter = ref(0)
</script>

<template>
  <div id="second-id" class="container mx-auto sm:px-2 md:py-2">
    
      <nav-bar v-model:counter="counter">
        <template #default>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/users">Users</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'about' }">About</router-link>
          </li>
        </template>
      </nav-bar>
      {{ counter }}
      <Suspense>
        <template #default>
          <div>
            <router-view>
            </router-view>
          </div>
        </template>
        <template #fallback>
          Waiting data...
        </template>
      </Suspense>
  </div>
</template>
