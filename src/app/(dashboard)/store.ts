import { create } from 'zustand';
import { Client, Plan } from '@/types';
import { getClients, getPlans } from '@/lib/supabase/data';

interface DataStore {
  clients: Client[];
  plans: { plan: Plan; price: number }[];
  loading: boolean;
  fetchData: () => Promise<void>;
  setClients: (clients: Client[]) => void;
  setPlans: (plans: { plan: Plan; price: number }[]) => void;
}

export const useData = create<DataStore>((set) => ({
  clients: [],
  plans: [],
  loading: true,
  fetchData: async () => {
    try {
      set({ loading: true });
      const [clientsData, plansData] = await Promise.all([
        getClients(),
        getPlans()
      ]);
      set({
        clients: clientsData,
        plans: plansData,
        loading: false
      });
    } catch (error) {
      console.error('Error loading data:', error);
      set({ loading: false });
    }
  },
  setClients: (clients) => set({ clients }),
  setPlans: (plans) => set({ plans }),
}));
