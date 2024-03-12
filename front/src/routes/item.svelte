<script>
	import { Cloudinary } from '@cloudinary/url-gen';
	export let element;

	const cld = new Cloudinary({
		cloud: {
			cloudName: 'dcgmvmf04'
		}
	});
	const photo = cld
		.image(element.photo)
		.format('auto')
		.quality('auto')
		.toURL();
</script>

<a href="/item_infos/{element.id}">
	<div class="item">
		<p class="name">{element.name}</p>
		<p class="category">{element.category}</p>
		<img alt="Picture of {element.name}" class="photo" src={photo} />
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
