<script setup lang="ts">
  import {defineComponent, ref } from 'vue'

  const users = ref<{ name: string, age: number }[]>([
    { name: 'Marco', age: 10 },
    { name: 'Giovanni', age: 20 },
    { name: 'Luigi', age: 30 },
    { name: 'Stefano', age: 40 }
  ])

  const wait5seconds = () => new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 5000)
  })

  console.log('before call')
  await wait5seconds()
  console.log('after 5 second')

</script>

<script lang="ts">
  export default defineComponent({
    name: 'UsersList',
    inheritAttrs: false,
  })
</script>

<template>

  <div>
    <h2>List of users</h2>
    <ul class="flex flex-col space-y-3">
      <li v-for="u in users" :key="u.name">
        <router-link :to="`/users/${u.name.toLowerCase()}`">
          <span>name: {{ u.name }}</span>
          <span>age: {{ u.age }}</span>
        </router-link>
      </li>
    </ul>
  </div>


</template>
