<script>
	export let element;
</script>

<div class='item'>
	<p class="name">{element.name}</p>
	<p class="category">{element.category}</p>
    <p class="notes">{element.notes}</p>
</div>

<style>
    .item{
        width:200px;
        height:200px;
        margin:5px;
        border:1px solid black;
        text-align:center;
    }
</style>
