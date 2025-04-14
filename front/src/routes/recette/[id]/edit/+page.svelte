<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getRecette, updateRecette, recette } from '$lib/stores/recette';
	import { goto } from '$app/navigation';
	import { getAllIngredients } from '$lib/stores/ingredient';
	import {  type IngredientQuantity } from '$lib/types/recette';
	import { writable } from 'svelte/store';
	import RecetteForm from '$lib/components/RecetteForm.svelte';
	import Swal from 'sweetalert2';

	let loading = true;
	let error = '';

	onMount(async () => {
		const id = $page.params.id;
		try {
			await getRecette(id);
		} catch (err) {
			error = 'Impossible de charger la recette.';
		} finally {
			loading = false;
		}
	});

	async function submitForm() {
		try {
			await updateRecette($recette!);
			Swal.fire({
				title: 'Recette mise à jour !',
				text: 'La recette a été mise à jour avec succès.',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true
			});
			goto('/recette/' + $recette?.id);
		} catch (err) {
			Swal.fire({
				title: 'Erreur !',
				text: 'Une erreur est survenue lors de la mise à jour de la recette.',
				icon: 'error'
			});
		}
	}

</script>

<div class="mx-auto max-w-2xl p-6">
	{#if loading}
		<p class="text-center text-gray-500">Chargement...</p>
	{:else if error}
		<p class="text-center font-bold text-red-500">{error}</p>
	{:else if $recette}
	<RecetteForm mode="update" recette={$recette} onSubmit={submitForm} />
	{:else}
		<p class="text-center text-gray-500">Aucune recette trouvée.</p>
	{/if}
</div>
