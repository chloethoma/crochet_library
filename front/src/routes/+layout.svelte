<script>
	import Icon from '../assets/img/wool_icon.svelte';

	let isLoggedIn = true;
</script>

<!-- Import Google Font -->
<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Lemonada:wght@300..700&display=swap"
		rel="stylesheet"
	/>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Madimi+One&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header>
	<div class="left-content">
		<Icon />
	</div>

	<div class="middle-content">
		<h1>Ma Bibliothèque Crochet</h1>
	</div>

	<div class="right-content">
		{#if isLoggedIn}
			<a href="/">Bibliothèque</a>
			<a href="/add_project">Ajouter un projet</a>
		{:else}
			<button>Connexion</button>
		{/if}
	</div>
</header>

<slot />

<style>
	header {
		display: flex;
		background-color: #f7dfd4;
		color: #db8e9d;
		font-family: 'Lemonada';
		padding: 10px;
		justify-content: space-between;
		align-items: center;
	}

	.left-content {
		max-width: 60px;
		margin-left: 10px;
		margin-right: 20px;
	}

	.middle-content {
		display: flex;
		align-items: center;
	}

	.right-content {
		display: flex;
		align-items: center;
	}

	h1 {
		margin: 0;
	}

	a {
		color: #db8e9d;
		text-decoration: none;
		padding: 5px 10px;
		border-radius: 5px;
		margin-right: 15px;
		cursor: pointer;
	}

	button {
		background-color: transparent;
		font-family: 'Lemonada';
		font-size: 15px;
		color: #db8e9d;
		border: 2px solid #db8e9d;
		padding: 5px 10px;
		border-radius: 5px;
		margin-right: 20px;
		cursor: pointer;
	}

	button:hover {
		background-color: #db8e9d;
		color: #2d4743;
	}
</style>
