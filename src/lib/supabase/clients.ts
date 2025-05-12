import { supabase } from "@/lib/supabase/data";
import { Client } from "@/types";

export function listenToClientsChanges(
  onChange: (payload: { type: string; new: Client | null; old: Client | null }) => void
) {
  const channel = supabase
    .channel('clients-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'clients',
      },
      (payload) => {
        onChange({
          type: payload.eventType,
          new: payload.new as Client | null,
          old: payload.old as Client | null,
        });
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

export async function getClientById(id: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function addClient(client: Client) {
  const { error } = await supabase
    .from('clients')
    .insert([client]);

  if (error) {
    throw error;
  }
}

export async function updateClient(client: Client) {
  const { error } = await supabase
    .from('clients')
    .update({
      name: client.name,
      email: client.email,
      plan: client.plan,
      status: client.status,
    })
    .eq('id', client.id);

  if (error) {
    throw error;
  }
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
