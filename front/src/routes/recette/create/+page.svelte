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

    let errors = writable<{ [key: string]: string }>({});

    function validateForm() {
      const newErrors: { [key: string]: string } = {};

      if (!$recette.nom.trim() || $recette.nom.length > 100) {
        newErrors.nom = "Le nom de la recette est requis et doit contenir entre 1 et 100 caractères.";
      }
      if ($recette.description.length > 500) {
        newErrors.description = "La description ne peut pas dépasser 500 caractères.";
      }
      if (!$recette.category) {
        newErrors.category = "La catégorie est requise.";
      }
      if ($recette.sous_category.some(sc => sc.length > 100)) {
        newErrors.sous_category = "Chaque sous-catégorie doit contenir au maximum 100 caractères.";
      }
      if ($recette.tps_preparation_min < 0 || $recette.tps_preparation_min > 1440) {
        newErrors.tps_preparation_min = "Le temps de préparation doit être compris entre 0 et 1440 minutes.";
      }
      if ($recette.tps_cuisson_min < 0 || $recette.tps_cuisson_min > 1440) {
        newErrors.tps_cuisson_min = "Le temps de cuisson doit être compris entre 0 et 1440 minutes.";
      }
      if (!$recette.type_cuisson.trim() || $recette.type_cuisson.length > 100) {
        newErrors.type_cuisson = "Le type de cuisson est requis et doit contenir au maximum 100 caractères.";
      }
      if (!$recette.origine.trim() || $recette.origine.length > 100) {
        newErrors.origine = "L'origine est requise et doit contenir au maximum 100 caractères.";
      }
      if ($recette.ingredients.length === 0) {
        newErrors.ingredients = "Au moins un ingrédient est requis.";
      } else {
        $recette.ingredients.forEach((ingredient, index) => {
          if (!ingredient.ingredient.trim() || ingredient.ingredient.length > 100) {
        newErrors[`ingredients[${index}].ingredient`] = "Le nom de l'ingrédient est requis et doit contenir au maximum 100 caractères.";
          }
          if (ingredient.quantite_gr <= 0 || ingredient.quantite_gr > 10000) {
        newErrors[`ingredients[${index}].quantite_gr`] = "La quantité doit être comprise entre 1 et 10000 grammes.";
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
        goto("/recette/" + id);
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
    {#if $errors.nom}
      <p class="text-red-500 text-sm">{$errors.nom}</p>
    {/if}
    <TextAreaField label="Description" bind:value={$recette.description} />
    {#if $errors.description}
      <p class="text-red-500 text-sm">{$errors.description}</p>
    {/if}
    <SelectField 
        label="Catégorie" 
        bind:value={$recette.category} 
        options={Object.values(Category).map(value => ({ label: value, value }))} 
        optionLabel="label" 
        optionValue="value" 
    />
    {#if $errors.category}
      <p class="text-red-500 text-sm">{$errors.category}</p>
    {/if}
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
  {#if $errors.sous_category}
    <p class="text-red-500 text-sm">{$errors.sous_category}</p>
  {/if}

    <InputField label="Temps de préparation (min)" type="number" bind:value={$recette.tps_preparation_min} required />
    {#if $errors.tps_preparation_min}
      <p class="text-red-500 text-sm">{$errors.tps_preparation_min}</p>
    {/if}
    <InputField label="Temps de cuisson (min)" type="number" bind:value={$recette.tps_cuisson_min} required />
    {#if $errors.tps_cuisson_min}
      <p class="text-red-500 text-sm">{$errors.tps_cuisson_min}</p>
    {/if}
    <InputField label="Type de cuisson" bind:value={$recette.type_cuisson} required />
    {#if $errors.type_cuisson}
      <p class="text-red-500 text-sm">{$errors.type_cuisson}</p>
    {/if}
    <InputField label="Origine" bind:value={$recette.origine} required />
    {#if $errors.origine}
      <p class="text-red-500 text-sm">{$errors.origine}</p>
    {/if}

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
    {#if $errors.ingredients}
      <p class="text-red-500 text-sm">{$errors.ingredients}</p>
    {/if}
    {#if $errors.quantite_gr}
      <p class="text-red-500 text-sm">{$errors.quantite_gr}</p>
    {/if}
    {#if $errors.ingredient}
      <p class="text-red-500 text-sm">{$errors.ingredient}</p>
    {/if}

    <Button type="submit">Créer la recette</Button>
    {#if Object.keys($errors).length > 0}
      <p class="text-red-500 text-sm">Modification requise</p>
    {/if}
</form>
