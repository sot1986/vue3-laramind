<script setup lang="ts">
  import { defineComponent, defineProps, defineEmits } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()

  const props = defineProps<{
    counter: number
  }>()
  const emits = defineEmits<{
    (e: 'update:counter', c: number): void
  }>()

  const incrementCounter = () => {
    console.log('cliccato')
    emits('update:counter', props.counter + 1)
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'NavBar',
    inheritAttrs: false,
  })
</script>

<template>
   <nav class="flex justify-between">
      <ul class="flex items-center space-x-4">
        <li>
          <button @click="incrementCounter" type="button">Incrementa counter</button>
        </li>
        <slot name="default"></slot>
        <li v-if="authStore.user">
          <router-link :to="{ name: 'Dashboard' }" @click="incrementCounter">Dashboard</router-link>
        </li>
      </ul>
      <ul class="flex items-center space-x-4">
        <slot name="guest-login">
          <template v-if="!authStore.user">
            <li >
              <router-link to="/register"  @click="incrementCounter">Register</router-link>
            </li>
            <li>
              <router-link to="/login"  @click="incrementCounter">Login</router-link>
            </li>
          </template>
          <template v-else>
            <form @submit.prevent="authStore.logout"  @click="incrementCounter">
              <button type="submit">
                Logout
              </button>
            </form>
          </template>
        </slot>
      </ul>
    </nav>
</template>
