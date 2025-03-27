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

    let ingrendent_quantity = writable<IngredientQuantity>({
        ingredient: '',
        quantite_gr: 0
    });

    let sous_category = writable<string>('');

    

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
        const id= await createRecette($recette);
        goto("/recette/" + id)
    }

    function addIngredient() {
        $recette.ingredients = [...$recette.ingredients, { ...$ingrendent_quantity }];
        ingrendent_quantity.set({ ingredient: '', quantite_gr: 0 });
    }

    function addSousCategory() {
        $recette.sous_category = [...$recette.sous_category, $sous_category];
        sous_category.set('');
    }
</script>

<form on:submit|preventDefault={submitForm} class="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
    <InputField label="Nom de la recette" bind:value={$recette.nom} required />
    <TextAreaField label="Description" bind:value={$recette.description} />
    <SelectField 
        label="Catégorie" 
        bind:value={$recette.category} 
        options={Object.values(Category).map(value => ({ label: value, value }))} 
        optionLabel="label" 
        optionValue="value" 
    />
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
          <InputField label="Sous catégorie" bind:value={$sous_category}  />
      </div>
      <button type="button" on:click={addSousCategory} class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Ajouter une sous catégorie
      </button>
  </div>

  {#if $recette.sous_category.length > 0}
      <div>
          <label for="ingredients-list" class="font-semibold">Sous catégories</label>
          <ul id="ingredients-list" class="list-disc pl-5">   
              {#each $recette.sous_category as sous_category}
                  <li>{sous_category}</li>
              {/each}
          </ul>
      </div>
  {/if}
    <InputField label="Temps de préparation (min)" type="number" bind:value={$recette.tps_preparation_min} required />
    <InputField label="Temps de cuisson (min)" type="number" bind:value={$recette.tps_cuisson_min} required />
    <InputField label="Type de cuisson" bind:value={$recette.type_cuisson} required />
    <InputField label="Origine" bind:value={$recette.origine} required />

    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <SelectField 
                label="Ingrédient" 
                bind:value={$ingrendent_quantity.ingredient} 
                options={$ingredients} 
                optionLabel="nom" 
                optionValue="id"
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
        <button type="button" on:click={addIngredient} class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Ajouter un ingrédient
        </button>
    </div>

    {#if $recette.ingredients.length > 0}
        <div>
            <label for="ingredients-list" class="font-semibold">Ingrédients</label>
            <ul id="ingredients-list" class="list-disc pl-5">
                {#each $recette.ingredients as ingredient}
                    <li>{ingredient.nom} - {ingredient.quantite_gr} gr</li>
                {/each}
            </ul>
        </div>
    {/if}

    <Button type="submit">Créer la recette</Button>
</form>
