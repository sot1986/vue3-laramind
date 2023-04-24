import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Auth } from '../types'
import { useApiStore } from './api'

export const useAuthStore = defineStore('auth', () => {
  const apiStore = useApiStore()

  const user = ref<null | Auth.User>(null)

  async function fetchUser() {
    const { data } = await apiStore.apiFetch<{ data: Auth.User }>('/api/user')
    user.value = { ...data }
  }

  async function logout() {
    
    try {
      await apiStore.apiFetch('/logout', { method: 'POST' })
    } catch (error) {
      console.error(error)
    } finally {
      user.value = null
      location.assign('/')
    }
    
    
  }

  return {
    user,
    logout,
    fetchUser,
  }
})