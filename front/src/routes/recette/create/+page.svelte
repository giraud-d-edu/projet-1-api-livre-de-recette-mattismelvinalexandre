<script lang="ts">
	import { writable } from 'svelte/store';
	import {  type Recette, Category } from '$lib/types/recette';
	import { goto } from '$app/navigation';
	import { createRecette } from '$lib/stores/recette';
    import Swal from "sweetalert2";
	import RecetteForm from '$lib/components/RecetteForm.svelte';

	async function submitForm() {
		const id = await createRecette($recette);
		if (id) {
			Swal.fire({
				title: 'Recette créée !',
				text: 'La recette a été créée avec succès.',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true
			});
			goto('/recette/' + id);
		} else {
			Swal.fire({
				title: 'Erreur !',
				text: 'Une erreur est survenue lors de la création de la recette.',
				icon: 'error'
			});
		}
	}

	let recette = writable<Recette>({
		nom: '',
		description: '',
		category: Category.PLAT,
		sous_category: [],
		tps_preparation_min: 0,
		tps_cuisson_min: 0,
		type_cuisson: '',
		origine: '',
		ingredients: [],
		image: ''
	});



</script>

<RecetteForm mode="create" recette={$recette} onSubmit={submitForm} />
