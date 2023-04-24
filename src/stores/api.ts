import { defineStore } from 'pinia'
import { ofetch } from 'ofetch'
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'

export const useApiStore = defineStore('api', () => {

  const cookies = useCookies(['XSRF-TOKEN'])
  const csrfToken = ref('')

  const apiFetch = ofetch.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: 'application/json'
    },
    credentials: 'include',
    onRequest({ options }) {
        if (csrfToken.value) {
          options.headers = { ...options.headers,
            'X-XSRF-TOKEN' : csrfToken.value
          }
        }
    },
    onResponse({ response }) {
      
    }
  })

  const fetchCsrfToken = async () => {
    csrfToken.value = ''
    try {
      await apiFetch('/sanctum/csrf-cookie')
      csrfToken.value = cookies.get<string>('XSRF-TOKEN')

      if (!csrfToken.value)
        throw new Error('No CSRF token on request.')
    } catch (error) {
      console.error(error)
    }   
  }

  return {
    csrfToken,
    apiFetch,
    fetchCsrfToken
  }
})