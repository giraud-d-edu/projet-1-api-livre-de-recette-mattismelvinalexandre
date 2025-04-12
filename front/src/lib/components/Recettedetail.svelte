<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteRecette } from '$lib/stores/recette';
	import Swal from 'sweetalert2';
	
	export let recette;
	const noImage = "/noimage.svg";
  </script>
  
  <article class="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto my-6">
	<header class="flex flex-col items-center text-center">
	  <div class="relative w-full max-w-md pb-[56.25%]">
		<img 
		  src={recette.image || noImage} 
		  alt={recette.nom} 
		  loading="lazy" 
		  class="absolute inset-0 w-full h-full object-cover rounded-lg"
		/>
	  </div>
	  <div class="mt-4">
		<h1 class="text-2xl font-semibold">{recette.nom}</h1>
		<p class="text-gray-600 text-sm mt-2">
		  {recette.category} ✨ {recette.sous_category.map((sub: any) => sub).join(', ')}
		</p>
		<div class="mt-4 space-x-2">
		  <button 
			onclick={() => goto('/')} 
			class="bg-gray-200 border border-gray-300 rounded px-4 py-2 hover:bg-gray-300 cursor-pointer"
		  >
			🔙 Retour
		  </button>
		  <button 
			onclick={() => goto(`/recette/${recette.id}/edit`)} 
			class="bg-blue-500 text-white border border-blue-600 rounded px-4 py-2 hover:bg-blue-600 cursor-pointer"
		  >
			✏️ Modifier
		  </button>
		  <button 
			onclick={async () => { 
				const result = await Swal.fire({
					title: "Êtes-vous sûr?",
					text: "Cette action supprimera la recette définitivement!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Supprimer",
					cancelButtonText: "Annuler",
				});
				if (result.isConfirmed) {
					await deleteRecette(recette.id)
					Swal.fire({
						title: "Supprimé!",
						text: "La recette a été supprimée avec succès.",
						icon: "success",
						timer: 2000,
						timerProgressBar: true,
					});
					goto('/');
				}
			}}
			class="bg-red-500 text-white border border-red-600 rounded px-4 py-2 hover:bg-red-600 cursor-pointer"
		  >
			🗑️ Supprimer
		  </button>
		</div>
	  </div>
	</header>
  
	<section class="mt-6 text-sm text-gray-800">
	  <p>🏹 {recette.description}</p>
	  <p><strong>⏰ Temps de préparation:</strong> {recette.tps_preparation_min} min</p>
	  <p><strong>🍽️ Temps de cuisson:</strong> {recette.tps_cuisson_min} min</p>
	  <p><strong>🔥 Type de cuisson:</strong> {recette.type_cuisson}</p>
	  <p><strong>🌍 Origine:</strong> {recette.origine}</p>
	</section>
  
	<section class="mt-6">
	  <h2 class="text-lg font-semibold mb-4">🛒 Ingrédients</h2>
	  <ul class="list-none p-0">
		{#each recette.ingredients as ingredient}
		  <li class="text-sm mb-1">- {ingredient.quantite_gr}g de {ingredient.nom}</li>
		{/each}
	  </ul>
	</section>
  </article>
  