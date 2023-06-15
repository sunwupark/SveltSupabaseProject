<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'
  import type { AuthSession } from '@supabase/supabase-js'
  import Account from './lib/Account.svelte'
  import Auth from './lib/Auth.svelte'
  import { Router, Route, navigate } from 'svelte-routing'

  let session: AuthSession

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session
      navigate('/product/123') // 예시로 경로를 '/product/123'으로 변경합니다.
    })
  })
</script>

<Router>
  <Route component={Auth} />
  <Route path="/product/:id">
    <Account session={session}/>
  </Route>
</Router>