<script>
    import {fly} from 'svelte/transition';
    export let open;

</script>

{#if open}
    <div class="menu" transition:fly={{ y: -15, delay: 50}}>
        <p transition:fly={{ y: -15, delay: 50}}><a href="/">Bibliothèque</a></p>
        <p transition:fly={{ y: -15, delay: 50}}><a href="/add_project">Ajouter un projet</a></p>
    </div>
{/if}

<style>
    .menu {
        width:auto;
        height:auto;
        position:absolute;
        z-index:1;
        background-color: #f7dfd4;
        top:95px;
        right:8px;
        text-align: center;
		border-bottom: solid #db8e9d 2px;
		border-top: solid #db8e9d 2px;
    }

    a {
		color: #db8e9d;
		font-size:15px;
		text-decoration: none;
		padding: 10px 10px;
		cursor: pointer;
	}
  
	a:hover {
        text-decoration: underline;
	}

    @media screen and (min-width: 900px) {
        .menu{
            top:110px;
        }

        p{
            padding:10px;
        }

        a{
            font-size:20px;
        }
    }
</style>