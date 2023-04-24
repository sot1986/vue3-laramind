<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useApiStore } from '../stores/api'

  const apiStore = useApiStore()

  const newUser = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  async function register() {
    try {
      await apiStore.fetchCsrfToken()

      await apiStore.apiFetch('/register', {
        method: 'POST',
        body: newUser.value
      })

      // console.log('utente creato')
      // location.assign('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }
</script>
 
<script lang="ts">
  export default defineComponent({
    name: 'RegisterVue',
    inheritAttrs: false,
  })
</script>

<template>
  <div>
    <h2>Register</h2>

    <form @submit.prevent="register">
      <fieldset class="flex flex-col space-y-3">
        <legend></legend>
          <div>
            <label for="name">Name</label>
            <input v-model="newUser.name" type="text" name="name" id="name" class="border">
          </div>
          <div>
            <label for="email">Email</label>
            <input v-model="newUser.email" type="text" name="email" id="email" class="border">
          </div>
          <div>
            <label for="password">Password</label>
            <input v-model="newUser.password" type="password" name="password" id="password" class="border">
          </div>
          <div>
            <label for="password_confirmation">Password Confirmation</label>
            <input v-model="newUser.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" class="border">
          </div>
      </fieldset>
      <div class="flex justify-center">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-full">Registra</button>
      </div>
    </form>
  </div>
</template>
