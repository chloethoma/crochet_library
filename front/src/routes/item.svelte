<script>
	import {getPhotoFromCloudinary} from './data.js'
	export let element;

</script>

<a href="/item_infos/{element.id}">
	<div class="item">
		<p class="name">{element.name}</p>
		<p class="category">{element.category}</p>
		{#await getPhotoFromCloudinary(element)}
			<p>Loading...</p>
		{:then data} 
		<img alt="Picture of {data}" class="photo" src={data} />
		{:catch}
			<p>Something wrong...</p>
		{/await}
	</div>
</a>

<!-- Ancien src pour les photos : ./src/assets/photos/taro_le_dino.jpg -->

<style>
	.item {
		flex: 0 0 20%;

		display: grid;
		grid-template-rows: 30px 30px minmax(50px, 200px);

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

	.name {
		font-weight: 700;
		font-size: 18px;
	}

	.photo {
		max-width: 100%;
		max-height: 100%;
	}
</style>
