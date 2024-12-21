import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-hot-toast'

import axiosInstance from '@/axiosInstance'
import { ENDPOINTS } from '@/store/constants/api'
import { User } from '@/store/Models/User'
import {throttle} from '@/utils/throttle'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  //errror= false
  // loading =false
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await axiosInstance.post(ENDPOINTS.LOGIN, {
            email,
            password
          })
          const {
            id,
            role,
            nomPrenom,
            adresse,
            imageLink,
            DepartmentIds,
            DepartmentId
          } = response.data.user || {} // Récupération des données de l'utilisateur

          const token = response.data.token

          axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`

          set({
            user: {
              id,
              role,
              nomPrenom,
              email,
              adresse,
              imageLink,
              DepartmentIds: role == 'member' ? DepartmentIds : undefined, // Récupérer departmentIds seulement pour les membres
              DepartmentId: role == 'instructor' ? DepartmentId : undefined // Récupérer departmentId seulement pour les instructeurs
            },
            isAuthenticated: true
          })
          toast.success('Login successful')
        } catch (error) {
          toast.error(error.response?.data?.message || 'Login failed')
          console.error('Login failed:', error)
          throw error
        }
      },
      logout: throttle(async () => {
        try {
          const response = await axiosInstance.post(ENDPOINTS.LOGOUT)
          document.cookie = 'token=; Max-Age=0; path=/; domain=' + window.location.hostname // Clear the token cookie
          if (response.status === 200) {
            toast.success('Logout successful')
            set({ user: null, isAuthenticated: false }) // Réinitialiser l'état lors de la déconnexion
          }
          window.location.href = '/'
        } catch (error) {
          console.error('Logout failed:', error)
          toast.error('Logout failed')
        }
      }, 1000)
    }),
    { name: 'auth-store' }
  )
)
