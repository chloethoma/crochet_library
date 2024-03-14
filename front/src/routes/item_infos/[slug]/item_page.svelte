<script>
    import {getPhotoFromCloudinary} from '../../data.js'

    export let element
</script>

<div class="item">
    <p>{element.id}</p>
    <p>{element.name}</p>

    {#await getPhotoFromCloudinary(element)}
    <p>Loading...</p>
    {:then data} 
    <img alt="Picture of {data}" class="photo" src={data} />
    {:catch}
    <p>Something wrong...</p>
    {/await}
</div>

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

	.photo {
		max-width: 100%;
		max-height: 100%;
	}
</style>


