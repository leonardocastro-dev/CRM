import { create } from 'zustand'
import { Client } from '@/types'
import { getClients, getPlans } from '@/lib/supabase/data'
import { listenToClientsChanges } from '@/lib/supabase/clients'
import { Plan } from '@/enums'
import { listenToPlanChanges } from '@/lib/supabase/plans'

interface DataStore {
  clients: Client[]
  plans: { plan: Plan; price: number }[]
  loading: boolean
  fetchData: () => Promise<void>
  setClients: (clients: Client[]) => void
  setPlans: (plans: { plan: Plan; price: number }[]) => void
  initClientsRealtime: () => void
  initPlansRealtime: () => void
}

export const useData = create<DataStore>((set) => ({
  clients: [],
  plans: [],
  loading: true,

  fetchData: async () => {
    try {
      set({ loading: true })
      const [clientsData, plansData] = await Promise.all([
        getClients(),
        getPlans()
      ])
      set({
        clients: clientsData,
        plans: plansData,
        loading: false
      })
    } catch (error) {
      console.error('Error loading data:', error)
      set({ loading: false })
    }
  },

  setClients: (clients) => set({ clients }),
  setPlans: (plans) => set({ plans }),

  initClientsRealtime: () => {
    listenToClientsChanges(({ type, new: newClient, old }) => {
      set((state) => {
        switch (type) {
          case 'INSERT':
            return { clients: [...state.clients, newClient!] }
          case 'UPDATE':
            return {
              clients: state.clients.map((c) =>
                c.id === newClient!.id ? newClient! : c
              )
            }
          case 'DELETE':
            return {
              clients: state.clients.filter((c) => c.id !== old!.id)
            }
          default:
            return state
        }
      })
    })
  },

  initPlansRealtime: () => {
    listenToPlanChanges(({ type, new: newPlan }) => {
      if (type === 'UPDATE' && newPlan) {
        set((state) => ({
          plans: state.plans.map((p) =>
            p.plan === newPlan.plan ? { ...p, price: newPlan.price } : p
          )
        }))
      }
    })
  }
}))
