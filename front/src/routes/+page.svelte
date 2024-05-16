<script>
	import Item from '../lib/components/ItemCard.svelte';
	import {onMount} from 'svelte';
	import { getAllData } from './data.js';

	onMount(() => {
		getAllData()
	})
	
</script>

{#await getAllData()}
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
