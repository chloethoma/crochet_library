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
    pattern = [...pattern, {name:'', source:'', link:null}]
  }

  const addWool = () => {
    wool = [...wool, {brand: '', name: '', grammage: '', color: '', material: '', price: ''}];
  }

  const handleSubmit = async () => {
    const formData = {name, category, customer, size, hook_number: parseInt(hookNumber), notes, photo, year, month, pattern, wool};
    // 'https://localhost:3000/api/new_project'
    try {
      const response = await fetch('https://crochet-library-7cv7.vercel.app/api/new_project',{
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      alert("Projet crée !")
      // const resultat = await response.json()
      // console.log("reussite", resultat)
    } catch (error) {
      alert("Erreur !")
      console.error("Erreur", error)
    }
  }

</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="name">Nom du projet</label>
  <input type="text" id="name" bind:value={name} required>

  <label for="category">Catégorie</label>
  <select id="category" bind:value={category}>
      {#each selectedCategories as selectedCategory}
          <option value={selectedCategory}>{selectedCategory}</option>
      {/each}
  </select>

  <div class="dateContainer">
    <label for="date">Date de réalisation</label>
    <label for="year">Année</label>
    <input type="number" id="year" bind:value={year} required>
    <label for="month">Mois</label>
    <input type="number" id="month" min="1" max="12" bind:value={month} required>
  </div>

  <label for="customer">Destinataire</label>
  <input type="text" id="customer" bind:value={customer}>

  <label for="size">Dimensions (en cm)</label>
  <input type="text" id="size" bind:value={size}>

  <label for="hook_number">N° crochet</label>
  <input type="number" min="0" step="0.5" id="hook_number" bind:value={hookNumber}>

    <!-- <label for="photo">Photo</label>
  <Fileupload></Fileupload> -->
  <!-- <input type="text" id="photo" name="photo"> -->
  <!-- <label for="photo">Photo:</label>
  <input type="file" id="photo" bind:files={photo} /> -->


  <label for="notes">Notes</label>
  <textarea id="notes" bind:value={notes}></textarea>
  
  <button type="button" on:click={addPattern}>Ajouter pattern</button>
  {#each pattern as  {name, source, link}}
  <div>
    <label for="name">Nom</label>
    <input type="text" id="name" bind:value={name} required>
    
    <label for="source">Source</label>
    <input type="text" id="source" bind:value={source} required>
    
    <label for="link">Fichier</label>
    <input type="text" id="link" bind:value={link}>
  </div>
  {/each}

  <button type="button" on:click={addWool}>Ajouter yarn</button>
  {#each wool as  {brand, name, grammage, color, material, price}}
  <div>
    <label for="brand">Marque</label>
    <input type="text" id="brand" bind:value={brand} required>

    <label for="name">Nom</label>
    <input type="text" id="name" bind:value={name} required>

    <label for="grammage">Grammage</label>
    <input type="number" min="1" id="grammage" bind:value={grammage}>
    
    <label for="material">Matière</label>
    <input type="text" id="material" bind:value={material}>
    
    <label for="color">Couleur</label>
    <input type="text" id="color" bind:value={color}>

    <label for="price">Prix</label>
    <input type="number" min="1" step="any" id="price" bind:value={price}>
  </div>
  {/each}

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