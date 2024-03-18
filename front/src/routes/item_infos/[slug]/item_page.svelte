<script>
    import {getPhotoFromCloudinary} from '../../data.js'
	
    export let item
</script>

<div class="item">
    <p>{item.name}</p>
	<p>{item.category}</p>
	<p>{item.year} {item.month}</p>
	<p>{item.customer}</p>
	<p>{item.size}</p>
	<p>{item.hook_number}</p>
	{#each item.pattern as pattern}
		<p>{pattern.name}</p>
		<p>{pattern.source}</p>
		<p>{pattern.link}</p>
		<p>{pattern.file}</p>
	{/each}

	{#each item.wool as wool}
		<p>{wool.brand}</p>
	{/each}

	<p>{item.notes}</p>
	
    {#await getPhotoFromCloudinary(item.photo)}
    <p>Loading...</p>
    {:then img} 
    <img alt="Picture of {img}" class="photo" src={img} />
    {:catch}
    <p>Something wrong...</p>
    {/await}

</div>

<style>
	.item {
		flex: 0 0 20%;

		display: grid;
		grid-template-rows: 30px 30px minmax(30px, 200px);

		font-family: 'Josefin Sans', sans-serif;
		font-optical-sizing: auto;
		font-style: normal;

		background-color: rgb(156, 187, 177, 0.5);
		text-align: center;
		place-items: center;
		margin: 10px;
		padding: 10px;
		border: 1px solid black;
		border-radius: 5%;
		cursor: pointer;
	}

	.photo {
		max-width: 100%;
		max-height: 100%;
	}
</style>


