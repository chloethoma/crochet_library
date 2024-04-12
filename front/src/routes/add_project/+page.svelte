<script>

</script>

<form action='http://localhost:3000/api/new_project' method="post">
    <label for="name">Nom du projet</label>
    <input type="text" id="name" name="name">

    <label for="category">Catégorie</label>
    <select id="category" name="category">
        <option value="">Choose a category</option>
        <option value="amigurumi">Amigurumi</option>
        <option value="accessory">Accessoire</option>
        <option value="child">Enfant</option>
        <option value="home">Maison</option>
        <option value="clothe">Vêtement</option>
    </select>

    <label for="customer">Destinataire</label>
    <input type="text" id="customer" name="customer">

    <label for="customer">Dimensions</label>
    <input type="text" id="dimension" name="dimension">

    <label for="hook_number">Hook Number</label>
    <input type="text" id="hook_number" name="hook_number">

    <label for="photo">Photo</label>
    <input type="text" id="photo" name="photo">
    
    <label for="notes">Notes</label>
    <textarea id="notes" name="notes"></textarea>

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