<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$lib/components/Card.svelte';
  import { getAllRecettes, recettes } from '$lib/stores/recette';

  let loading = true

  onMount(async () => {
    loading = true;
    await getAllRecettes();
    console.log($recettes);
    
    loading = false
  });
</script>

<h1>Recettes</h1>

{#if loading}
  <p>Chargement des recettes...</p>
{:else if $recettes.length === 0}
  <p>Aucune recette disponible.</p>xz
{:else}
  <div class="recipe-list">
    {#each $recettes as recette}
      <Card {recette} />
    {/each}
  </div>
{/if}

<style>
  .recipe-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>
