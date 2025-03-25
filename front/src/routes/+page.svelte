<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$lib/components/Card.svelte';
  import { getAllRecettes, recettes } from '$lib/stores/recette';
	import { goto } from '$app/navigation';

  let loading = true

  onMount(async () => {
    loading = true;
    await getAllRecettes();
    console.log($recettes);
    
    loading = false
  });
</script>

<div class="header-container">
  <h1>Recettes</h1>
  <button class="styled-button" on:click={() => goto("/recette/create")}>Ajouter</button>
</div>

{#if loading}
  <p>Chargement des recettes...</p>
{:else if $recettes.length === 0}
  <p>Aucune recette disponible.</p>
{:else}
  <div class="recipe-list">
    {#each $recettes as recette}
      <Card {recette} />
    {/each}
  </div>
{/if}

<style>

  .header-container {
    display: flex;
    justify-content: space-between;
  }
  .recipe-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .styled-button {
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    width: 100px;
  }
</style>
