<script>
	import Item from './item.svelte';

	const getData = async () => {
		const res = await fetch('http://localhost:3000/api/library');
		const data = await res.json();
		return data;
	};
</script>


{#await getData()}
    <p>Loading...</p>
{:then data}
<div class="itemContainer">
        {#each data as element}
		<Item element={element}/>
        {/each}
    </div>
{:catch error}
    <p>Something wrong...</p>
{/await}


<style>
    .itemContainer {
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        width:65%;
        height:80vh;
        overflow:auto;
    }
</style>

