<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Recette } from '$lib/types/recette.ts';
  
	export let recette: Recette;
  </script>
  
  <article class="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mx-4 my-4 max-w-xs">
	<header class="mb-4">
	  {#if recette.image}
		<img src={recette.image} alt={recette.nom} class="w-full h-auto rounded-lg object-cover" />
	  {:else}
		<img src={recette.image || 'https://placehold.co/600x338?text=No+Image'} alt={recette.nom} class="w-full h-auto rounded-lg object-cover" />
	  {/if}
	  <h2 class="text-xl font-semibold mt-4">{recette.nom}</h2>
	  <p class="text-gray-600 text-sm mt-2">
		{recette.category} ✨ {recette.sous_category.map((sub) => sub).join(', ')}
	  </p>
	</header>
  
	<section class="text-sm text-gray-800">
	  <p>🏹 {recette.description}</p>
	  <p><strong>⏰ Temps de préparation:</strong> {recette.tps_preparation_min} min</p>
	  <p><strong>🍽️ Temps de cuisson:</strong> {recette.tps_cuisson_min} min</p>
	  <p><strong>🔥 Type de cuisson:</strong> {recette.type_cuisson}</p>
	  <p><strong>🌍 Origine:</strong> {recette.origine}</p>
	</section>
  
	<footer class="mt-6">
	  <button 
		on:click={() => goto(`/recette/${recette.id}`)} 
		class="bg-gray-200 text-gray-800 border border-gray-300 rounded px-4 py-2 hover:bg-gray-300 transition-all"
	  >
		👩‍🍳 Voir la recette
	  </button>
	</footer>
  </article>
  