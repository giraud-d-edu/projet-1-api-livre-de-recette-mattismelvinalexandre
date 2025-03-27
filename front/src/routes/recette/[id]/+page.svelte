<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
	import { getRecette, recette } from "$lib/stores/recette";
    import Recettedetail from "../../../lib/components/Recettedetail.svelte";
  
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
    <p>Chargement...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if $recette}
    <Recettedetail recette={$recette} />
  {:else}
    <p>Aucune recette trouvée.</p>
  {/if}
  
  <style>
    .error {
      color: red;
      font-weight: bold;
    }
  </style>
  