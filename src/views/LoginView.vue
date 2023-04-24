<script setup lang="ts">
    import { defineComponent, ref } from 'vue'
  import { useApiStore } from '../stores/api'

  const apiStore = useApiStore()

  const newUser = ref({
    email: '',
    password: '',
  })

  async function login() {
    try {
      await apiStore.fetchCsrfToken()

      await apiStore.apiFetch('/login', {
        method: 'POST',
        body: newUser.value
      })

      location.assign('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'LoginPage',
    inheritAttrs: false,
  })
</script>

<template>
  <div>
    Login

    <form @submit.prevent="login">
      <fieldset class="flex flex-col space-y-3">
        <legend></legend>
          <div>
            <label for="email">Email</label>
            <input v-model="newUser.email" type="text" name="email" id="email" class="border">
          </div>
          <div>
            <label for="password">Password</label>
            <input v-model="newUser.password" type="password" name="password" id="password" class="border">
          </div>
      </fieldset>
      <div class="flex justify-center">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-full">Login</button>
      </div>
    </form>
  </div>
</template>
