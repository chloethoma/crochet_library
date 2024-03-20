<script>
	import { getPhotoFromCloudinary } from '../../data.js';
	import Icon from '../../../assets/img/wool_icon.svelte';

	export let item;
	console.log(item.notes)
</script>

<div class="itemContainer">
	<div class="itemGrid">
		<div class="imgSection">
			{#if item.photo !== ""}
			{#await getPhotoFromCloudinary(item.photo)}
				<p>Loading...</p>
			{:then img}
				<img alt="Picture of {img}" class="img" src={img} />
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

		<div class="generalSection">
			<h2 class='title'>{item.name}</h2>
			<div class="infoSection">
				<div>Catégorie :</div>
				<div>{item.category}</div>
				<div>Date :</div>
				<div>{item.month} / {item.year}</div>
				<div>Destinataire :</div>
				<div>{item.customer}</div>
				<div>Dimension :</div>
				<div>{item.size}</div>
				<div>N° crochet :</div>
				<div>{item.hook_number}</div>
			</div>
		</div>

		<div class="patternSection">
			<h3>Patrons</h3>
			{#if item.pattern[0] !== null}
				{#each item.pattern as pattern}
				<div class="patternItem">
					<div>Nom :</div>
					<div>{pattern.name}</div>
					<div>Source :</div>
					<div>{pattern.source}</div>
					<div>Lien :</div>
					<div>{pattern.link}</div>
					<div>Fichier :</div>
					<div>{pattern.file}</div>
					<div>----------</div>
				</div>
				{/each}
			{/if}
		</div>

		<div class="woolSection">
			<h3>Fils utilisés</h3>
			{#if item.wool[0] !== null}
				{#each item.wool as wool}
				<div class="woolItem">
					<div>Marque :</div>
					<div>{wool.brand}</div>
					<div>Matière :</div>
					<div>{wool.material}</div>
					<div>Nom :</div>
					<div>{wool.name}</div>
					<div>Couleur :</div>
					<div>{wool.color}</div>
					<div>Grammage :</div>
					<div>{wool.grammage} g/pelote</div>
					<div>Prix :</div>
					<div>{wool.price} €/pelote</div>
					<div>----------</div>
				</div>
				{/each}
			{/if}
		</div>

		<div class="noteSection">
			<h3>Notes</h3>
			<div>{item.notes}</div>
		</div>
	</div>
</div>

<style>
	.itemContainer {
		display: flex;
		flex-direction: column;
		max-width: 700px;

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

	.itemGrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		row-gap:10px
	}

	.title{
		margin-bottom:40px;
		padding:10px;
		text-decoration: underline;
	}


	.infoSection {
		display:grid;
		grid-template-columns: 120px 1fr;
		text-align: left;
		margin-left:10px;
		row-gap: 10px;
	}

	.patternSection, .woolSection, .noteSection{
		grid-column: 1/3;
		text-align: left;
		margin-left:20px;
	}

	.patternItem {
		display:grid;
		grid-template-columns: 100px 1fr;
		text-align: left;
		row-gap: 10px;
		margin-top:10px;
	}

	.woolItem {
		display:grid;
		grid-template-columns: 100px 1fr 100px 1fr;
		row-gap: 10px;
		text-align: left;
		margin-top:30px;
	}

	h3{
		text-align: center;
		text-decoration: underline;
	}

	.img {
		/* width:66%; */
		max-width: 90%;
		max-height: 100%;
	}
</style>
