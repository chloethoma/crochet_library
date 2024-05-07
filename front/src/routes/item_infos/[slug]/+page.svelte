<script>
	import { page } from '$app/stores';
	import { getItemData } from '../../data.js';
	import ItemInfos from './item_page.svelte';

	const params = $page.params;
	const itemId = params.slug;	
</script>

{#await getItemData(itemId)}
	<p>Loading...</p>
{:then item}
	<div class="itemContainer">
		<ItemInfos {item} />
	</div>
{:catch error}
	<p>Something wrong...</p>
{/await}

<style>
	.itemContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
