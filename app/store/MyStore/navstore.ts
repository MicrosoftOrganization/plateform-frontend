import {create } from 'zustand'

type NavState = {
    departmentId: string | null,
    setDepartmentId: (id: string) => void
}
export const useNavStore = create<NavState>((set) => ({
    departmentId: null,
    setDepartmentId: (id) => set({departmentId: id})
}))