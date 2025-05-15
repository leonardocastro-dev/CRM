import { createClient } from '@supabase/supabase-js'
import { Client } from '@/types'
import { Plan } from '@/enums'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase.from('clients').select('*')

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data || []
}

export async function getPlans(): Promise<{ plan: Plan; price: number }[]> {
  const { data, error } = await supabase.from('plan_prices').select('*')

  if (error) {
    console.error('Error fetching plans:', error)
    return []
  }

  return data || []
}
