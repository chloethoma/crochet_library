  <script>
	import { getPhotoFromCloudinary } from '../../data.js';
	import Icon from '../../../assets/img/wool_icon.svelte';
	// import { stringify } from 'postcss';

	export let item;

</script>

<div class="itemContainer">
	<div class="itemGrid">
		<a class="backLink" href="/">X</a>
		<div class="imgSection">
			{#if item.photo !== ''}
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
			<h2 class="title">{item.name}</h2>
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
			<table>
				<thead>
					<tr>
						<th scope="col">Nom</th>
						<th scope="col">Source</th>
						<th scope="col">Lien/fichier</th>
					</tr>
				</thead>
				<tbody>
					{#each item.pattern as {name, source, link}}
						<tr>
							<td>{name}</td>
							<td>{source}</td>
							<td><a href={link}>{link ? "Lien" : '/'}</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
			{/if}
		</div>
		
		<div class="woolSection">
			<h3>Fils utilisés</h3>
			{#if item.wool[0] !== null}
			<table>
				<thead>
					<tr>
						<th scope="col">Marque</th>
						<th scope="col">Nom</th>
						<th scope="col">Grammage</th>
						<th scope="col">Matière</th>
						<th scope="col">Couleur</th>
						<th scope="col">Prix</th>
					</tr>
				</thead>
				<tbody>
				{#each item.wool as {brand, name, grammage, material, color, price}}
				  <tr>
					<td>{brand}</td>
					<td>{name}</td>
					<td>{grammage} g/pelote</td>
					<td>{material}</td>
					<td>{color}</td>
					<td>{price}€ / pelote</td>
				  </tr>
				  {/each}
				</tbody>
			</table>
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
		background-color: rgb(156, 187, 177, 0.5);
		font-size: 10px;
		color: #2d4743;
		/* text-align: center; */
		margin: 8px;
		padding: 15px 20px 15px 10px;
		border: 2px solid #2d4743;
		border-radius: 2%;
	}

	.itemGrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		row-gap: 5px;
		position:relative;
	}

	.backLink {
		z-index:1;
		position:absolute;
		left:0px;
		background-color: transparent;
		font-size: 12px;
		font-weight:700;
		color: #2d4743;
		border: 2px solid #2d4743;
		text-decoration: none;
		padding: 3px 5px;
		border-radius: 50%;
		cursor: pointer;
	}

	.backLink:hover {
		background-color: #db8e9d;
		color: #2d4743;
	}


	.title {
		margin-bottom: 20px;
		font-size: 20px;
		border-bottom: 3px solid #2d4743;
	}

	.infoSection {
		display: grid;
		grid-template-columns: 85px 1fr;
		text-align: left;
		margin-left: 2px;
		row-gap: 5px;
	}

	.imgSection {
		display: grid;
		place-items: center;
		text-align: center;
		max-width: 90%;
	}

	.patternSection,
	.woolSection,
	.noteSection {
		grid-column: 1/3;
		text-align: left;
		margin-left: 10px;
	}

	h3 {
		font-size: 16px;
		border-bottom: 1px solid #2d4743;
	}

	.img {
		max-width: 70%;
	}

	table{
		border-collapse: collapse;
	}

	th, td{
		border:1px solid #2d4743;
		padding:5px;
		vertical-align: middle;
	}

	@media screen and (min-width: 600px) {
		.itemContainer {
			max-width: 700px;
			font-size:16px;
			margin: 10px;
		}

		.itemGrid {
			row-gap: 10px;
		}

		.backLink {
			font-size: 18px;
			font-weight:700;
			padding: 5px 7px;
		}

		.generalSection{
			margin-right: 20px;
		}

		.title {
			font-size: 30px;
			margin-bottom: 30px;
		}

		.infoSection {
			grid-template-columns: 120px 1fr;
			row-gap: 15px;
		}

		.imgSection {
			max-width: 100%;
		}

		.patternSection,
		.woolSection,
		.noteSection {
			margin-left: 20px;
			margin-right: 20px;
		}

		th, td{
			padding:10px;
		}

		h3 {
			font-size: 20px;
		}

		.img {
			max-width: 60%;
		}

	}
</style>
