<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$lib/components/Card.svelte';
  import { getAllRecettes, recettes } from '$lib/stores/recette';
  import { goto } from '$app/navigation';

  let loading = true;

  onMount(async () => {
    loading = true;
    await getAllRecettes();
    loading = false;
  });
</script>

<div class="flex justify-between items-center mb-6">
  <h1 class="text-2xl font-bold">Recettes</h1>
  <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer" on:click={() => goto("/recette/create")}>
    Ajouter
  </button>
</div>

{#if loading}
  <p class="text-gray-500">Chargement des recettes...</p>
{:else if $recettes.length === 0}
  <p class="text-gray-500">Aucune recette disponible.</p>
{:else}
  <div class="flex flex-wrap justify-evenly gap-5">
    {#each $recettes as recette}
      <Card {recette} />
    {/each}
  </div>
{/if}
