<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import * as RecettesApi from '$lib/api/recette';
    import * as IngredientsApi from '$lib/api/ingredient';
    import type { Recette, IngredientQuantity } from '$lib/types/recette';
    import { goto } from '$app/navigation';
    import InputField from '$lib/components/Input.svelte';
    import TextAreaField from '$lib/components/TextArea.svelte';
    import SelectField from '$lib/components/SelectField.svelte';
    import Button from '$lib/components/Button.svelte';
  
    let recette = writable<Recette>({
      id: '',
      nom: '',
      description: '',
      category: { name: '' },
      sous_category: [],
      tps_preparation_min: 0,
      tps_cuisson_min: 0,
      type_cuisson: '',
      origine: '',
      ingredients: [],
      image: ''
    });
  
    let allIngredients = writable([]);
  
    onMount(async () => {
      allIngredients.set(await IngredientsApi.findAll());
    });
  
    async function submitForm() {
      await RecettesApi.create($recette);
      goto('/recette');
    }
  
    function addIngredient() {
      recette.update(r => {
        r.ingredients.push({ ingredient: '', quantite_gr: '' });
        return r;
      });
    }
  </script>
  
  <form on:submit|preventDefault={submitForm} class="form-container">
    <InputField label="Nom de la recette" bind:value={$recette.nom} required />
    <TextAreaField label="Description" bind:value={$recette.description} />
    <InputField label="Catégorie" bind:value={$recette.category.name} required />
    <InputField label="Temps de préparation (min)" type="number" bind:value={$recette.tps_preparation_min} required />
    <InputField label="Temps de cuisson (min)" type="number" bind:value={$recette.tps_cuisson_min} required />
    <InputField label="Type de cuisson" bind:value={$recette.type_cuisson} />
    <InputField label="Origine" bind:value={$recette.origine} />
  
    <label>Ingrédients</label>
    {#each $recette.ingredients as ingredient, index}
      <div class="ingredient-container">
        <SelectField bind:value={ingredient.ingredient} options={$allIngredients} optionLabel="nom" optionValue="id" />
        <InputField type="text" bind:value={ingredient.quantite_gr} placeholder="Quantité (gr)" />
      </div>
    {/each}
    <Button on:click={addIngredient} type="button">Ajouter un ingrédient</Button>
  
    <InputField label="Image (URL)" bind:value={$recette.image} />
  
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
  