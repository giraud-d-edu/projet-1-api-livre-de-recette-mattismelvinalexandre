<script lang="ts">
	import { getAllIngredients, ingredients } from '$lib/stores/ingredient';
    import { onMount } from 'svelte';
    let loading = true;

    onMount(async () => {
    loading = true;
    await getAllIngredients();
    loading = false
    });
</script>

<h1>Ingredients</h1>

{#if loading}
    <p>Chargement des Ingrédients...</p>
{:else if $ingredients.length > 0}
    <ul>
        {#each $ingredients as ingredient}
            <li>{ingredient.nom}</li>
        {/each}
    </ul>
{:else}
    <p>No ingredients found.</p>
{/if}