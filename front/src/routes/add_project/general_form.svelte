<script>
  import {Fileupload} from 'flowbite-svelte';

  let selectedCategories = ['Amigurumi', 'Accessoire', 'Enfant', 'Maison', 'Vêtement']
  let name;
  let category;
  let customer;
  let size;
  let hookNumber;
  let notes;
  let photo = null;
  let year;
  let month;
  let pattern = [];
  let wool = [];

  const addPattern = () => {
    pattern = pattern.concat({name:'', source:'', link:null})
  }

  // const addPattern = () => {
  //   pattern.push({name:'', source:'', link:null})
  // }

  const addWool = () => {
    wool = wool.concat({brand: '', name: '', grammage: '', color: '', material: '', price: ''});
  }

  const handleSubmit = () => {
    const formData = {name, category, customer, size, hook_number: parseInt(hookNumber), notes, photo, year, month, pattern, wool};
    console.log(formData);
    // Ici, vous pouvez envoyer formData à votre serveur ou le traiter comme nécessaire
    // fetch to 'http://localhost:3000/api/new_project' ou 'https://crochet-library-7cv7.vercel.app/api/new_project'
  }

</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="name">Nom du projet</label>
  <input type="text" id="name" bind:value={name}>

  <label for="category">Catégorie</label>
  <select id="category" bind:value={category}>
      {#each selectedCategories as selectedCategory}
          <option value={selectedCategory}>{selectedCategory}</option>
      {/each}
  </select>

  <div class="dateContainer">
    <label for="date">Date de réalisation</label>
    <label for="year">Année</label>
    <input type="text" id="year" bind:value={year}>
    <label for="month">Mois</label>
    <input type="text" id="month" bind:value={month}>
  </div>

  <label for="customer">Destinataire</label>
  <input type="text" id="customer" bind:value={customer}>

  <label for="size">Dimensions (en cm)</label>
  <input type="text" id="size" bind:value={size}>

  <label for="hook_number">N° crochet</label>
  <input type="text" id="hook_number" bind:value={hookNumber}>

  <label for="notes">Notes</label>
  <textarea id="notes" bind:value={notes}></textarea>
  
  <button type="button" on:click={addPattern}>Ajouter pattern</button>
  {#each pattern as  {name, source, link}, i}
  <div>
    <label for="name">Nom</label>
    <input type="text" id="name" bind:value={name}>
    
    <label for="source">Source</label>
    <input type="text" id="source" bind:value={source}>
    
    <label for="link">Lien</label>
    <input type="text" id="link" bind:value={link}>
  </div>
  {/each}

  <!-- <label for="photo">Photo</label>
  <Fileupload></Fileupload> -->
  <!-- <input type="text" id="photo" name="photo"> -->
  <!-- <label for="photo">Photo:</label>
  <input type="file" id="photo" bind:files={photo} /> -->
  <button type="submit">Enregistrer</button>
</form>

<style>
  form {
      display:grid;
      grid-template-columns:auto;
      row-gap: 5px;
  }
  
  label{
      margin-top:10px;
  }
</style>