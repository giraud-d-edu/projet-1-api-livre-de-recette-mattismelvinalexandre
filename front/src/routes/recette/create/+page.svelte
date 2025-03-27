<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { type IngredientQuantity, type Recette, Category } from '$lib/types/recette';
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/Input.svelte';
	import TextAreaField from '$lib/components/TextArea.svelte';
	import SelectField from '$lib/components/SelectField.svelte';
	import Button from '$lib/components/Button.svelte';
	import { getAllIngredients, ingredients } from '$lib/stores/ingredient';
	import { createRecette } from '$lib/stores/recette';

	let ingredient_quantity = writable<IngredientQuantity>({
		ingredient: '',
		quantite_gr: 1
	});

	let sous_category = writable<string>('');

	let errors = writable<{ [key: string]: string }>({});

	function validateForm() {
		const newErrors: { [key: string]: string } = {};

		if (!$recette.nom.trim() || $recette.nom.length > 100) {
			newErrors.nom = 'Le nom de la recette est requis et doit contenir entre 1 et 100 caractères.';
		}
		if ($recette.description.length > 500) {
			newErrors.description = 'La description ne peut pas dépasser 500 caractères.';
		}
		if (!$recette.category) {
			newErrors.category = 'La catégorie est requise.';
		}
		if ($recette.sous_category.some((sc) => sc.length > 100)) {
			newErrors.sous_category = 'Chaque sous-catégorie doit contenir au maximum 100 caractères.';
		}
		if ($recette.tps_preparation_min < 0 || $recette.tps_preparation_min > 1440) {
			newErrors.tps_preparation_min =
				'Le temps de préparation doit être compris entre 0 et 1440 minutes.';
		}
		if ($recette.tps_cuisson_min < 0 || $recette.tps_cuisson_min > 1440) {
			newErrors.tps_cuisson_min = 'Le temps de cuisson doit être compris entre 0 et 1440 minutes.';
		}
		if (!$recette.type_cuisson.trim() || $recette.type_cuisson.length > 100) {
			newErrors.type_cuisson =
				'Le type de cuisson est requis et doit contenir au maximum 100 caractères.';
		}
		if (!$recette.origine.trim() || $recette.origine.length > 100) {
			newErrors.origine = "L'origine est requise et doit contenir au maximum 100 caractères.";
		}
		if ($recette.ingredients.length === 0) {
			newErrors.ingredients = 'Au moins un ingrédient est requis.';
		} else {
			$recette.ingredients.forEach((ingredient, index) => {
				if (!ingredient.ingredient.trim() || ingredient.ingredient.length > 100) {
					newErrors[`ingredients[${index}].ingredient`] =
						"Le nom de l'ingrédient est requis et doit contenir au maximum 100 caractères.";
				}
				if (ingredient.quantite_gr <= 0 || ingredient.quantite_gr > 10000) {
					newErrors[`ingredients[${index}].quantite_gr`] =
						'La quantité doit être comprise entre 1 et 10000 grammes.';
				}
			});
		}

		errors.set(newErrors);
		console.log(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	async function submitForm() {
		if (validateForm()) {
			const id = await createRecette($recette);
			goto('/recette/' + id);
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

	onMount(async () => {
		await getAllIngredients();
	});

	function addIngredient() {
		if (!$ingredient_quantity.ingredient || $ingredient_quantity.quantite_gr <= 0) return;
		$recette.ingredients = [...$recette.ingredients, { ...$ingredient_quantity }];
		ingredient_quantity.set({ ingredient: '', quantite_gr: 1 });
	}

	function addSousCategory() {
		if (!$sous_category) return;
		$recette.sous_category = [...$recette.sous_category, $sous_category];
		sous_category.set('');
	}

	function handleDeleteIngredient(ingredient: IngredientQuantity) {
		$recette!.ingredients = $recette!.ingredients.filter((i) => i !== ingredient);
	}

	function handleDeleteSousCategory(sous_category: string) {
		$recette!.sous_category = $recette!.sous_category.filter((sc) => sc !== sous_category);
	}
</script>

<form
	on:submit|preventDefault={submitForm}
	class="mx-auto flex max-w-lg flex-col gap-4 rounded-lg bg-white p-6 shadow-lg"
>
	<InputField label="Nom de la recette" bind:value={$recette.nom} required />
	{#if $errors.nom}
		<p class="text-sm text-red-500">{$errors.nom}</p>
	{/if}
	<TextAreaField label="Description" bind:value={$recette.description} />
	{#if $errors.description}
		<p class="text-sm text-red-500">{$errors.description}</p>
	{/if}
	<SelectField
		label="Catégorie"
		bind:value={$recette.category}
		options={Object.values(Category).map((value) => ({ label: value, value }))}
		optionLabel="label"
		optionValue="value"
	/>
	{#if $errors.category}
		<p class="text-sm text-red-500">{$errors.category}</p>
	{/if}
	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<InputField label="Sous catégorie" bind:value={$sous_category} />
		</div>
		<button
			type="button"
			on:click={addSousCategory}
			class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		>
			Ajouter une sous catégorie
		</button>
	</div>
	{#if $recette.sous_category.length > 0}
		<div>
			<label for="ingredients-list" class="font-semibold">Sous catégories</label>
			<ul id="ingredients-list" class="list-disc pl-5">
				{#each $recette.sous_category as sous_category}
					<div class="mt-2 flex items-center gap-2">
						<li>{sous_category}</li>
						<Button type="button" onClick={() => handleDeleteSousCategory(sous_category)}>
							Supprimer
						</Button>
					</div>
				{/each}
			</ul>
		</div>
	{/if}
	{#if $errors.sous_category}
		<p class="text-sm text-red-500">{$errors.sous_category}</p>
	{/if}

	<InputField
		label="Temps de préparation (min)"
		type="number"
		bind:value={$recette.tps_preparation_min}
		required
	/>
	{#if $errors.tps_preparation_min}
		<p class="text-sm text-red-500">{$errors.tps_preparation_min}</p>
	{/if}
	<InputField
		label="Temps de cuisson (min)"
		type="number"
		bind:value={$recette.tps_cuisson_min}
		required
	/>
	{#if $errors.tps_cuisson_min}
		<p class="text-sm text-red-500">{$errors.tps_cuisson_min}</p>
	{/if}
	<InputField label="Type de cuisson" bind:value={$recette.type_cuisson} required />
	{#if $errors.type_cuisson}
		<p class="text-sm text-red-500">{$errors.type_cuisson}</p>
	{/if}
	<InputField label="Origine" bind:value={$recette.origine} required />
	{#if $errors.origine}
		<p class="text-sm text-red-500">{$errors.origine}</p>
	{/if}

	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<SelectField
				label="Ingrédient"
				bind:value={$ingredient_quantity.ingredient}
				options={$ingredients}
				optionLabel="nom"
				optionValue="id"
				onChange={(e: Event) => {
					const target = e.target as HTMLSelectElement | null;
					if (target) {
						const selectedIngredient = $ingredients.find(
							(ingredient) => ingredient.id == target.value
						);
						if (selectedIngredient) {
							$ingredient_quantity.nom = selectedIngredient.nom;
						}
					}
				}}
			/>
			<div class="mt-3">
				<InputField
					label="Quantité (gr)"
					type="number"
					bind:value={$ingredient_quantity.quantite_gr}
					placeholder="Quantité (gr)"
				/>
				{#if $ingredient_quantity.quantite_gr <= 0 || $ingredient_quantity.quantite_gr > 10000}
					<p class="text-sm text-red-500">
						La quantité doit être comprise entre 1 et 10000 grammes.
					</p>
				{/if}
			</div>
		</div>
		<button
			type="button"
			on:click={addIngredient}
			class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		>
			Ajouter un ingrédient
		</button>
	</div>

	{#if $recette.ingredients.length > 0}
		<div>
			<label for="ingredients-list" class="font-semibold">Ingrédients</label>
			<ul id="ingredients-list" class="list-disc pl-5">
				{#each $recette.ingredients as ingredient}
					<div class="mt-2 flex items-center gap-2">
						<li>{ingredient.nom} - {ingredient.quantite_gr} gr</li>
						<Button type="button" onClick={() => handleDeleteIngredient(ingredient)}>
							Supprimer
						</Button>
					</div>
				{/each}
			</ul>
		</div>
	{/if}
	{#if $errors.ingredients}
		<p class="text-sm text-red-500">{$errors.ingredients}</p>
	{/if}

	<Button type="submit">Créer la recette</Button>
	{#if Object.keys($errors).length > 0}
		<p class="text-sm text-red-500">Modification requise</p>
	{/if}
</form>
