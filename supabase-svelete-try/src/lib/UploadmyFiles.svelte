<script lang="ts">
    import { supabase } from '../supabaseClient'
    let count: number = 0
    const increment = () => {
      count += 1
    }
  </script>
  
  <button on:click={increment}>
    count is {count}
  </button>
  
  <div>
    <div>
        PLEASE WORK!!!
    </div>
  </div>