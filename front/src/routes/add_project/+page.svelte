<script>

</script>

<form action='http://localhost:3000/api/new_project' method="post">
    <label for="name">Nom du projet</label>
    <input type="text" id="name" name="name">

    <label for="category">Catégorie</label>
    <select id="category" name="category">
        <option value="">Choose a category</option>
        <option value="accessory">Accessoire</option>
        <option value="amigurumi">Amigurumi</option>
        <option value="clothe">Vêtement</option>
    </select>

    <label for="customer">Destinataire</label>
    <input type="text" id="customer" name="customer">

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
        grid-template-columns:120px 300px;
        /* grid-template-rows: repeat(2, 30px) 100px; */
        row-gap: 10px;;
    }
</style>