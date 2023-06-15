<script>
    import supabase from "$lib/db"
    import { onMount } from "svelte";

    let todos = [];

    onMount(async () => {
        let {data, error} = await supabase.from("todos").select("*");
        todos = data;
        console.table(todo);
     })
</script>

{#each todos as todo}
    <div>
        <input
    </div>
{:else}
<p>No todos found</p>
{/each}