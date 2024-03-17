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
		<ItemInfos {item} />
{:catch error}
	<p>Something wrong...</p>
{/await}
