<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { type IngredientQuantity, type Recette, Category } from '$lib/types/recette';
    import { goto } from '$app/navigation';
    import InputField from '$lib/components/Input.svelte';
    import TextAreaField from '$lib/components/TextArea.svelte';
    import SelectField from '$lib/components/SelectField.svelte';
    import Button from '$lib/components/Button.svelte';
	import { getAllIngredients,ingredients } from '$lib/stores/ingredient';
	import { createRecette } from '$lib/stores/recette';

    let ingrendent_quantity = writable<IngredientQuantity>({
      ingredient: '',
      quantite_gr: 0
    });
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
  
    async function submitForm() {
      createRecette($recette).then(() => goto('/') );
    }
  
    function addIngredient() {
      console.log($ingrendent_quantity);
      $recette.ingredients = [...$recette.ingredients, { ...$ingrendent_quantity }];
      console.log($recette);
      ingrendent_quantity.set({ ingredient: '', quantite_gr: 0 });
    }
  </script>
  
  <form on:submit|preventDefault={submitForm} class="form-container">
    <InputField label="Nom de la recette" bind:value={$recette.nom} required />
    <TextAreaField label="Description" bind:value={$recette.description} />
    <SelectField label="Catégorie" bind:value={$recette.category} options={Object.values(Category).map(value => ({ label: value, value }))} optionLabel="label" optionValue="value" />
    <InputField label="Temps de préparation (min)" type="number" bind:value={$recette.tps_preparation_min} required/>
    <InputField label="Temps de cuisson (min)" type="number" bind:value={$recette.tps_cuisson_min} required/>
    <InputField label="Type de cuisson" bind:value={$recette.type_cuisson} required/>
    <InputField label="Origine" bind:value={$recette.origine} required/>
  
      <div id="ingredients" class="ingredient-container">
        <SelectField label="Ingrédient" bind:value={$ingrendent_quantity.ingredient} options={$ingredients} optionLabel="nom" optionValue="id" 
        onChange={(e: Event) => {
          const target = e.target as HTMLSelectElement | null;
          if (target) {
            const selectedIngredient = $ingredients.find(ingredient => ingredient.id == target.value);
            if (selectedIngredient) {
              $ingrendent_quantity.nom = selectedIngredient.nom;
            }
          }
        }}
        />
        <InputField label="Quantité (gr)" type="number" bind:value={$ingrendent_quantity.quantite_gr} placeholder="Quantité (gr)" />
      </div>
    <button type="button" on:click={addIngredient}>Ajouter un ingrédient</button>

    {#if $recette.ingredients.length > 0}
      <label for="ingredients-list">Ingredients</label>
      <ul id="ingredients-list">
      {#each $recette.ingredients as ingredient}
        <li>{ingredient.nom} - {ingredient.quantite_gr} gr</li>
      {/each}
      </ul>
    {/if}
    <Button type="submit">Créer la recette</Button>
  </form>
  
  <style>
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  
    .ingredient-container {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  </style>
  