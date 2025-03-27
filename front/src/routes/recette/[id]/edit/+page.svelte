<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { getRecette, updateRecette, recette } from "$lib/stores/recette";
    import { goto } from "$app/navigation";
    import InputField from "$lib/components/Input.svelte";
    import TextAreaField from "$lib/components/TextArea.svelte";
    import SelectField from "$lib/components/SelectField.svelte";
    import Button from "$lib/components/Button.svelte";
    import { getAllIngredients, ingredients } from "$lib/stores/ingredient";
    import { Category, type IngredientQuantity } from "$lib/types/recette";
    import { writable } from "svelte/store";

    let loading = true;
    let error = "";

    let ingrendent_quantity = writable<IngredientQuantity>({
        ingredient: '',
        quantite_gr: 0
    });

    onMount(async () => {
        const id = $page.params.id;
        try {
            await getRecette(id);
            await getAllIngredients();
        } catch (err) {
            error = "Impossible de charger la recette.";
        } finally {
            loading = false;
        }
    });

    async function submitForm() {
        try {
            await updateRecette($recette!);
            goto("/recette/" + $recette?.id);
        } catch (err) {
            error = "Échec de la mise à jour de la recette.";
        }
    }

    function addIngredient() {
        $recette!.ingredients = [...$recette!.ingredients, { ...$ingrendent_quantity }];
        ingrendent_quantity.set({ ingredient: '', quantite_gr: 0 });
    }
</script>

<div class="max-w-2xl mx-auto p-6">
    {#if loading}
        <p class="text-center text-gray-500">Chargement...</p>
    {:else if error}
        <p class="text-center text-red-500 font-bold">{error}</p>
    {:else if $recette}
        <form on:submit|preventDefault={submitForm} class="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-800 text-center">Modifier la recette</h2>
            
            <InputField label="Nom de la recette" bind:value={$recette.nom} required />
            <TextAreaField label="Description" bind:value={$recette.description} />
            <SelectField 
                label="Catégorie" 
                bind:value={$recette.category} 
                options={Object.values(Category).map(value => ({ label: value, value }))} 
                optionLabel="label" 
                optionValue="value" 
            />
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

            <Button type="submit">Modifier la recette</Button>
        </form>
    {:else}
        <p class="text-center text-gray-500">Aucune recette trouvée.</p>
    {/if}
</div>
