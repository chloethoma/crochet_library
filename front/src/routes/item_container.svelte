<script>
	import Item from './item.svelte';
	import {getData} from './data.js'
    
</script>

{#await getData()}
	<p>Loading...</p>
{:then data}
	<div class="itemContainer">
		{#each data as element}
			<Item {element} />
		{/each}
	</div>
{:catch error}
	<p>Something wrong...</p>
{/await}

<style>
	.itemContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		align-content: flex-start;
		overflow: auto;
	}
</style>
