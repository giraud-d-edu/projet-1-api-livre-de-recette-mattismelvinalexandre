<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$lib/components/Card.svelte';
  import { getAllRecettes, getAllUniqueInformations, recettes,searchRecettes,uniqueInformations } from '$lib/stores/recette';
  import { goto } from '$app/navigation';

  let loading = true;

  import { writable } from 'svelte/store';
	import type { Search } from '$lib/types/recette';

  export let searchParams = writable<Search>({nom:''});

  onMount(async () => {
    loading = true;
    await getAllRecettes();
    await getAllUniqueInformations();
    loading = false;
  });
</script>

<div class="flex justify-between items-center mb-6">
  <h1 class="text-2xl font-bold">Recettes</h1>
  <input
    type="text"
    placeholder="Rechercher une recette..."
    class="border px-4 py-2 rounded-md w-full max-w-xs"
    bind:value={$searchParams.nom}
    on:input={async () => await searchRecettes($searchParams)}
  />
  <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer" on:click={() => goto("/recette/create")}>
    Ajouter
  </button>
</div>

  <!-- <div class="flex flex-wrap gap-4 mb-6">
    <div>
      <label for="sous-category" class="block text-sm font-medium mb-1">Sous-catégories</label>
      <select
        id="sous-category"
        multiple
        class="border px-4 py-2 rounded-md w-full"
        bind:value={$searchParams.sous_category}
        on:change={async () => await searchRecettes($searchParams)}
      >
        {#each ($uniqueInformations?.sous_category ?? []) as sous_category}
          <option value={sous_category}>{sous_category}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="origine" class="block text-sm font-medium mb-1">Origine</label>
      <select
        id="origine"
        multiple
        class="border px-4 py-2 rounded-md w-full"
        bind:value={$searchParams.origine}
        on:change={async () => await searchRecettes($searchParams)}
      >
        {#each ($uniqueInformations?.origine ?? []) as origine}
          <option value={origine}>{origine}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="temps-max" class="block text-sm font-medium mb-1">Temps max (minutes)</label>
      <input
        id="temps-max"
        type="number"
        class="border px-4 py-2 rounded-md w-full"
        bind:value={$searchParams.tps_max}
        on:input={async () => await searchRecettes($searchParams)}
      />
    </div>

    <div>
      <label for="type-cuisson" class="block text-sm font-medium mb-1">Type de cuisson</label>
      <select
        id="type-cuisson"
        multiple
        class="border px-4 py-2 rounded-md w-full"
        bind:value={$searchParams.type_cuisson}
        on:change={async () => await searchRecettes($searchParams)}
      >
        {#each ($uniqueInformations?.type_cuisson ?? []) as type_cuisson}
          <option value={type_cuisson}>{type_cuisson}</option>
        {/each}
      </select>
    </div>
  </div> -->

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
