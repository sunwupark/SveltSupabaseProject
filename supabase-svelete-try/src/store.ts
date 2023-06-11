import { writable } from 'svelte/store'
import type { User } from '@supabase/supabase-js'
import { createClient } from  '@supabase/supabase-js'

const defaultStore = {
    user: null,
    msgs: []
}

export type Store = {
    user: User
    msgs: Msg[]
}
  
export type Msg = {
    id: number
    text: string
    username: string
}

export const store = writable<Store>(defaultStore)

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') {
      store.update((oldStore) => {
        return {
          ...oldStore,
          user: session.user
        }
      })
    } else if (event == 'SIGNED_OUT') {
      store.set(defaultStore)
    }
  })
  
  export default {
    login: async ({ email }: { email: string }) => {
      const password = 'hello@user'
  
      const { error } = await supabase.auth.signUp({
        email,
        password
      })
  
      if (error.message === 'User already registered') {
        await supabase.auth.signIn({
          email,
          password
        })
      }
    },
    logout: async () => {
      await supabase.auth.signOut()
    },
    msg: {
      send: async ({ username, text }: { username: string; text: string }) =>
        await supabase.from('messages').insert([{ is_authenticated: true, username, text }]),
  
      getAll: async (): Promise<Msg[]> => {
        const res = await supabase.from('messages').select().order('timestamp', {
          ascending: true
        })
        return res.data
      }
    }
  }