<script setup lang="ts">
  import { computed, defineComponent, defineProps } from 'vue'

  
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })

  const name = computed(() => props.name)
</script>

<script lang="ts">
  export default defineComponent({
    name: 'UserPage',
    inheritAttrs: false,
  })
</script>

<template>
  <div>
    specific User {{ name }}
  </div>
</template>
