<script>
	import { page } from '$app/stores';
    // import { Cloudinary } from '@cloudinary/url-gen';

    // const cld = new Cloudinary({
	// 	cloud: {
	// 		cloudName: 'dcgmvmf04'
	// 	}
	// });
	// const photo = cld
	// 	.image(element.photo)
	// 	.format('auto')
	// 	.quality('auto')
	// 	.toURL();


	const params = $page.params;
	const itemId = params.slug;

	const getItemData = async () => {
		const res = await fetch(`http://localhost:3000/api/item/${itemId}`);
		const data = await res.json();
		return data;
	};
</script>

{#await getItemData()}
	<p>Loading...</p>
{:then data}
    {#each data as element }
    <p>{element.id}</p>
    <p>{element.name}</p>
    <img src={element.photo} alt="Picture of {element.photo}"/>
    {/each}

{:catch error}
	<p>Something wrong...</p>
{/await}
