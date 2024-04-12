<script>
	import {getPhotoFromCloudinary} from './data.js'
	import Icon from '../assets/img/wool_icon.svelte';

	export let element;
</script>

<a href="/item_infos/{element.id}">
	<div class="item">
		<p class="name">{element.name}</p>
		<p class="category">{element.category}</p>
		{#if element.photo !== ""}
		{#await getPhotoFromCloudinary(element.photo)}
			<p>Loading...</p>
		{:then img} 
		<img alt="Picture of {img}" class="photo" src={img} />
		{:catch}
			<p>Something wrong...</p>
		{/await}
		{:else}
		<div class="icon">
			<Icon></Icon>
			<p>Photo à venir</p>
		</div>
		{/if}
	</div>
</a>

<!-- Ancien src pour les photos : ./src/assets/photos/taro_le_dino.jpg -->

<style>
	.item {
		flex: 0 0 auto;
		flex-basis:20%;
		display: grid;
		grid-template-rows: 30px 30px minmax(50px, 200px);
		max-width:130px;
		max-height:250px;

		font-family: 'Josefin Sans', sans-serif;
		color:#2d4743;
		background-color: rgb(156, 187, 177, 0.5);
		text-align: center;
		place-items: center;
		margin: 10px;
		padding: 10px;
		border: 2px solid #2d4743;
		border-radius: 5%;
		cursor: pointer;
	}

	.name {
		font-weight: 700;
		font-size: 16px;
	}

	.category {
		font-size:14px;
	}

	.photo {
		max-width: 100%;
		max-height: 100%;
	}

	a{
		text-decoration: none;
	}

	@media screen and (min-width: 900px) {
		.item {
		grid-template-rows: 30px 30px minmax(50px, 240px);
		min-width:200px;
		min-height: 310px;
		margin: 15px;
		padding: 20px;
		row-gap: 5px;
	}

	.name {
		font-size: 20px;
	}

	.category {
		font-size:16px;
	}
	
	}

</style>
