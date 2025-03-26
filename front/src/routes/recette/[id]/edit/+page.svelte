<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { getRecette, updateRecette, recette } from "$lib/stores/recette";
    import { goto } from "$app/navigation";
    import InputField from "$lib/components/Input.svelte";
    import TextAreaField from "$lib/components/TextArea.svelte";
    import SelectField from "$lib/components/SelectField.svelte";
    import Button from "$lib/components/Button.svelte";
    import * as IngredientsApi from "$lib/api/ingredient";

    let allIngredients = [];
    let loading = true;
    let error = "";

    onMount(async () => {
        const id = $page.params.id;
        try {
            await getRecette(id);
            allIngredients = await IngredientsApi.findAll();
        } catch (err) {
            error = "Impossible de charger la recette.";
        } finally {
            loading = false;
        }
    });

    async function submitForm() {
        try {
            await updateRecette($recette);
            goto("/recette/" + $recette.id);
        } catch (err) {
            error = "Échec de la mise à jour de la recette.";
        }
    }
</script>

{#if loading}
    <p>Chargement...</p>
{:else if error}
    <p class="error">{error}</p>
{:else if $recette}
    <form on:submit|preventDefault={submitForm} class="form-container">
        <InputField label="Nom de la recette" bind:value={$recette.nom} required />
        <TextAreaField label="Description" bind:value={$recette.description} />
        <InputField label="Catégorie" bind:value={$recette.category.name} required />
        <InputField label="Temps de préparation (min)" type="number" bind:value={$recette.tps_preparation_min} required />
        <InputField label="Temps de cuisson (min)" type="number" bind:value={$recette.tps_cuisson_min} required />
        <InputField label="Type de cuisson" bind:value={$recette.type_cuisson} />
        <InputField label="Origine" bind:value={$recette.origine} />

        <label for="ingredients">Ingrédients</label>
        <div id="ingredients">
            {#each $recette.ingredients as ingredient, index}
                <div class="ingredient-container">
                    <SelectField bind:value={ingredient.ingredient} options={allIngredients} optionLabel="nom" optionValue="id" />
                    <InputField type="text" bind:value={ingredient.quantite_gr} placeholder="Quantité (gr)" />
                </div>
            {/each}
        </div>
        
        <Button type="submit">Modifier la recette</Button>
    </form>
{:else}
    <p>Aucune recette trouvée.</p>
{/if}

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

    .error {
        color: red;
        font-weight: bold;
    }
</style>