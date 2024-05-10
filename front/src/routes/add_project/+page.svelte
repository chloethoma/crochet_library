<script>
    import {Fileupload} from 'flowbite-svelte';

    let showNewPattern = false;
    const displayFormNewPattern = () => {
        showNewPattern = !showNewPattern
    }

    let selectedCategories = ['Amigurumi', 'Accessoire', 'Enfant', 'Maison', 'Vêtement']

    let name = '';
    let category = '';
    let customer = '';
    let size = '';
    let hookNumber = '';
    let notes = '';
    let photo = null;
    let year = '';
    let month = '';
    let pattern = [];
    let wool = [];
  
    const addPattern = () => {
      pattern.push({
        name: '',
        source: '',
        link: null
      });
    }
  
    const addWool = () => {
      wool.push({
        brand: '',
        name: '',
        grammage: '',
        color: '',
        material: '',
        price: ''
      });
    }
  
    const handleSubmit = () => {
      const formData = {
        name,
        category,
        customer,
        size,
        hook_number: parseInt(hookNumber),
        notes,
        photo,
        year,
        month,
        pattern,
        wool
      };
      console.log(formData);
      // Ici, vous pouvez envoyer formData à votre serveur ou le traiter comme nécessaire
      // fetch to 'http://localhost:3000/api/new_project' ou 'https://crochet-library-7cv7.vercel.app/api/new_project'
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

    <label for="date">Date de réalisation</label>
    <label for="year">Année</label>
    <input type="text" id="year" bind:value={year} required>
    <label for="month">Mois</label>
    <input type="text" id="month" bind:value={month} required>

    <label for="customer">Destinataire</label>
    <input type="text" id="customer" bind:value={customer}>

    <label for="size">Dimensions (en cm)</label>
    <input type="text" id="size" bind:value={size}>

    <label for="hook_number">N° crochet</label>
    <input type="text" id="hook_number" bind:value={hookNumber}>

    <!-- <label for="photo">Photo</label>
    <Fileupload></Fileupload> -->
    <!-- <input type="text" id="photo" name="photo"> -->

    <label for="notes">Notes</label>
    <textarea id="notes" bind:value={notes} required></textarea>

    <!-- <button on:click={displayFormNewPattern}>Ajouter pattern</button> -->
    <!-- <label></label> -->

    <button type="submit">Enregistrer</button>
</form>

  
  <!-- <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required />
  
    <label for="category">Category:</label>
    <input type="text" id="category" bind:value={category} required />
  
    <label for="customer">Customer:</label>
    <input type="text" id="customer" bind:value={customer} required />
  
    <label for="size">Size:</label>
    <input type="text" id="size" bind:value={size} required />
  
    <label for="hook_number">Hook Number:</label>
    <input type="number" id="hook_number" bind:value={hookNumber} required />
  
    <label for="notes">Notes:</label>
    <textarea id="notes" bind:value={notes}></textarea>
  
    <label for="photo">Photo:</label>
    <input type="file" id="photo" bind:files={photo} />
  
    <label for="year">Year:</label>
    <input type="text" id="year" bind:value={year} required />
  
    <label for="month">Month:</label>
    <input type="text" id="month" bind:value={month} required />
  
    <button type="button" on:click={addPattern}>Add Pattern</button>
    {#each pattern as p, i}
      <div>
        <label for={`pattern_name_${i}`}>Pattern Name:</label>
        <input type="text" id={`pattern_name_${i}`} bind:value={p.name} required />
  
        <label for={`pattern_source_${i}`}>Source:</label>
        <input type="text" id={`pattern_source_${i}`} bind:value={p.source} required />
  
        <label for={`pattern_link_${i}`}>Link:</label>
        <input type="url" id={`pattern_link_${i}`} bind:value={p.link} />
      </div>
    {/each}
  
    <button type="button" on:click={addWool}>Add Wool</button>
    {#each wool as w, i}
      <div>
        <label for={`wool_brand_${i}`}>Brand:</label>
        <input type="text" id={`wool_brand_${i}`} bind:value={w.brand} required />
  
        <label for={`wool_name_${i}`}>Name:</label>
        <input type="text" id={`wool_name_${i}`} bind:value={w.name} required />
  
        <label for={`wool_grammage_${i}`}>Grammage:</label>
        <input type="number" id={`wool_grammage_${i}`} bind:value={w.grammage} required />
  
        <label for={`wool_color_${i}`}>Color:</label>
        <input type="text" id={`wool_color_${i}`} bind:value={w.color} required />
  
        <label for={`wool_material_${i}`}>Material:</label>
        <input type="text" id={`wool_material_${i}`} bind:value={w.material} required />
  
        <label for={`wool_price_${i}`}>Price:</label>
        <input type="number" id={`wool_price_${i}`} bind:value={w.price} required />
      </div>
    {/each}
  
    <button type="submit">Submit</button>
  </form> -->

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