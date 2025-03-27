<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { getRecette, recette } from "$lib/stores/recette";
  import Recettedetail from "$lib/components/Recettedetail.svelte";

  let loading = true;
  let error = "";

  onMount(async () => {
      const id = $page.params.id;
      try {
          await getRecette(id);
      } catch (err) {
          error = "Impossible de charger la recette.";
      } finally {
          loading = false;
      }
  });
</script>

{#if loading}
  <p class="text-gray-500">Chargement...</p>
{:else if error}
  <p class="text-red-500 font-bold">{error}</p>
{:else if $recette}
  <Recettedetail recette={$recette} />
{:else}
  <p class="text-gray-500">Aucune recette trouvée.</p>
{/if}