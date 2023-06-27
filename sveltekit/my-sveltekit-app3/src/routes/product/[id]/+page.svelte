<script>
    import {page} from '$app/stores'
    import ProductHeader from './ProductHeader.svelte';
    $: console.log($page);
</script>

<ProductHeader />

<h1>Product Page</h1>

<p> Product ID: {$page.params.id}</p>

<a href = "/product/3434"> Other Product</a>